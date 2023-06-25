import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//css
import './UserCard.css'
import '../../../main.css'

//modules
import { deleteToken } from '../../../utils/jwt';
import { Navigate } from 'react-router-dom';
import { message } from "antd";

function App() {

    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const user = useSelector(state => state.user)

    const showModal = (type, msg, duration = 2.0) => {
        messageApi.open({
            type: type,
            content: msg,
            duration: duration
        }).then(() => [
            navigate(0)
        ])
    };

    const logoutHandler = () => {
        const deleted = deleteToken()
        if (deleted) {
            // navigate(0)
            showModal('warning', 'Logging Out...', 1)
        } else {
            navigate('/login', { replace: true })
        }
    }

    return (
        <div id='user-card' className='flexbox'>
            {contextHolder}
            <div className='user-profile-photo'>
                {user && <>{user[0]}</>}
            </div>
            <div className='user-name'>
                {user && <h3>{user}</h3>}
            </div>
            <div className='user-logout'>
                <button
                    className='user-logout-btn'
                    onClick={logoutHandler}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default App;