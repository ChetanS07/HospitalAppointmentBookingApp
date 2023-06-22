import React from 'react';
import { NavLink, Link } from "react-router-dom";

//css
import './Navbar.css'

function App() {
    return (
        <nav id='navbar' className='flexbox navbar-small'>
            <Link to="/" className='logo'>Logo</Link>
            <ul className='nav-items-wrapper flexbox'>
                <li className='nav-item'>
                    <Link to="/#form-section">Book Appointment</Link>
                </li>
                <li className='nav-item'>
                    <NavLink to="/about">About</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink to="/login">Login</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default App;