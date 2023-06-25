import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios'
import { useDispatch } from 'react-redux';
import { message } from "antd";

//css
import './index.css'

//modules
import { validateString } from '../../utils/validaters';
import axios from '../../utils/axios';


//components
import Navbar from '../../components/header/Navbar'
import Copyright from '../../components/footer/Copyright'

function App() {
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [formvalid, setFormValid] = useState(false)

    const showModalAndNavigate = (type, msg, duration = 2.0) => {
        messageApi.open({
            type: type,
            content: msg,
            duration: duration
        }).then(() => {
            navigate('/admin/dashboard', { replace: true })
        })
    };

    const showModal = (type, msg, duration = 2.0) => {
        messageApi.open({
            type: type,
            content: msg,
            duration: duration
        })
    };

    const usernameHandler = (e) => {
        setUsername(e.target.value)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const checkValidity = () => {
        setFormValid(validateString(username) && validateString(password))
    }

    const login = async (e) => {
        e.preventDefault()
        //remove old jwt token
        try {
            if (formvalid) {
                const response = await axios({
                    method: 'POST',
                    url: 'usr/login',
                    data: {
                        userId: username,
                        password: password
                    }
                })
                console.log(response.data);

                if (response.data.status === 'success') {
                    const token = response.data.userToken
                    localStorage.setItem("userToken", token);
                    dispatch({ type: 'LOGIN' })
                    showModalAndNavigate('success', 'Loggin In...', 1)
                } else {
                    showModal('error', 'Failed to Login, Either User Doesnt Exist or Credentials Incorrect')
                }
            } else {
                showModal('warning', 'Fill all Credentials')
            }
        } catch (error) {
            showModal('error', 'Failed to Login, Server Error. Try Again Later')
        }
    }

    return (
        <>
            {contextHolder}
            <Navbar />
            <section id='login-section'>
                <form className='login-form'>
                    <input
                        className='login-input'
                        type="text"
                        name="username"
                        placeholder='Enter Username'
                        onChange={usernameHandler}
                        onBlur={checkValidity}
                    />
                    <input
                        className='login-input'
                        type="password"
                        name="password"
                        placeholder='Enter Your Password'
                        onChange={passwordHandler}
                        onBlur={checkValidity}
                    />
                    <button
                        className='login-btn'
                        onClick={login}
                    >Login
                    </button>
                </form>
            </section>
            <Copyright />
        </>

    );
}

export default App;