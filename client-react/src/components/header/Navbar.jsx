import React, { useRef } from 'react';
import { NavLink, Link } from "react-router-dom";
import { useSelector } from 'react-redux';

//css
import './Navbar.css'

function App() {

    const menuOpenBtn = useRef(null)
    const menuCloseBtn = useRef(null)
    const navItems = useRef(null)
    const inAdmin = useSelector(state => state.inAdmin)
    const isAuth = useSelector(state => state.isAuth)

    const scrollToForm = () => {
        window.scroll({ top: document.getElementById("form-section").offsetTop - 84 });
    }

    return (
        <nav id='navbar' className={inAdmin ? 'flexbox navbar-small' : 'flexbox'}>
            <button
                ref={menuOpenBtn}
                onClick={(event) => {
                    menuOpenBtn.current.classList.add('nav-open-btn-deactive')
                    menuCloseBtn.current.classList.add('nav-close-btn-active')
                    navItems.current.classList.add('nav-items-wrapper-active')
                }}
                className='nav-open-btn'
            >
                <i className="fa-solid fa-bars fa-2xl"></i>
            </button>
            <button
                ref={menuCloseBtn}
                className='nav-close-btn'
                onClick={(event) => {
                    menuOpenBtn.current.classList.remove('nav-open-btn-deactive')
                    menuCloseBtn.current.classList.remove('nav-close-btn-active')
                    navItems.current.classList.remove('nav-items-wrapper-active')
                }}
            >
                <i className="fa-solid fa-xmark fa-2xl"></i>
            </button>
            <Link to="/" className='logo'>HC</Link>
            <ul
                className='nav-items-wrapper flexbox'
                ref={navItems}
            >
                {!inAdmin &&
                    <li className='nav-item'>
                        <Link to='/' onClick={scrollToForm}>Book Appointment</Link>
                    </li>
                }
                {!inAdmin &&
                    <li className='nav-item'>
                        <Link to="">About</Link>
                    </li>
                }
                {!inAdmin &&
                    <li className='nav-item'>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                }
                {isAuth &&
                    <li className='nav-item' >
                        <NavLink to="/admin/dashboard" style={{ border: '1px solid aliceblue', padding: '.3rem 1rem' }}>My Profile</NavLink>
                    </li>}
            </ul>
        </nav>
    );
}

export default App;