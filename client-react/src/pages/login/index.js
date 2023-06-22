import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useDispatch } from 'react-redux';

//css
import './index.css'

//modules
import { validateString } from '../../utils/validaters';

//components
import Navbar from '../../components/header/Navbar'


function App() {

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [formvalid, setFormValid] = useState(false)

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
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    method: 'POST',
                    url: 'http://localhost:8000/usr/login',
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
                    navigate('/admin/dashboard', { replace: true })
                    //send jwt token to backend and redirect to /admin
                }
            } else {
                alert('Enter Details correctly')
            }
        } catch (error) {
            alert('error occured')
        }
    }

    return (
        <>
            <Navbar />
            <section id='login-section'>
                <form className='login-form'>
                    <input
                        type="text"
                        name="username"
                        placeholder='Enter Username'
                        onChange={usernameHandler}
                        onBlur={checkValidity}
                    />
                    <input
                        type="text"
                        name="password"
                        placeholder='Enter Your Password'
                        onChange={passwordHandler}
                        onBlur={checkValidity}
                    />
                    <button onClick={login}>Login</button>
                </form>
            </section>
        </>

    );
}

export default App;