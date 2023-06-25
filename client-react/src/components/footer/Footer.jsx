import React from 'react'
import { Link } from 'react-router-dom'

//css
import './Footer.css'
import '../../main.css'

//components
import SocialIcons from '../SocialIcons/SocialIcons'

function App() {
    return (
        <section id='footer-section' className='flexbox'>
            <div className='footer-left-wrapper'>
                <article>
                    <h2 className='footer-heading'>Health Care</h2>
                    <h3>A sanctuary of wellness.</h3>
                    <p className='footer-description'>
                        Our hospital appointment booking website, built using the MERN stack with Redux for state management, revolutionizes the way patients access healthcare services. Seamlessly integrating MongoDB as the database, Express.js for the backend, React for the frontend, and Node.js to power it all, our platform offers a user-friendly interface and advanced functionality
                    </p>
                </article>
            </div>
            <div className='footer-right-wrapper flexbox'>
                <Link to='/'>Home</Link>
                <Link>About Us</Link>
                <Link to='/login'>Login</Link>
                <Link target='_blank' to='https://github.com/ChetanS07/HospitalAppointmentBookingApp.git'>Project Code</Link>
                <div className='social-icons-wrapper'>
                    <SocialIcons />
                </div>
            </div>
        </section >
    );
}

export default App;