import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//css
import './UserCard.css'
import '../../../main.css'

//modules
import { deleteToken } from '../../../utils/jwt';
import { Navigate } from 'react-router-dom';

function App() {

    const navigate = useNavigate()
    const user = useSelector(state => state.user)

    const logoutHandler = () => {
        const deleted = deleteToken()
        if (deleted) {
            navigate(0)
        } else {
            navigate('/login', { replace: true })
        }
    }

    return (
        <div id='user-card' className='flexbox'>
            <div className='user-profile-photo'>
                {user[0]}
            </div>
            <div className='user-name'>
                <h3>{user}</h3>
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