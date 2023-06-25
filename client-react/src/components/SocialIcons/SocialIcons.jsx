import React from 'react';
import { Link } from 'react-router-dom'

//css
import './SocialIcons.css'

function App() {
    return (
        <div id="contact-icons">
            <Link target="_blank" to="https://twitter.com/ChetanShetter" className="contact-icon">
                <i className="fa-brands fa-twitter fa-2x"></i>
            </Link>
            <Link target="_blank" to="https://www.instagram.com/chetan_shetter/" className="contact-icon">
                <i className="fa-brands fa-instagram fa-2x"></i>
            </Link>
            <Link target="_blank" to="https://www.linkedin.com/in/chennabasappa-g-shetter-25a5b4227/" className="contact-icon">
                <i className="fa-brands fa-linkedin fa-2x"></i>
            </Link>
            <Link target="_blank" to="https://github.com/ChetanS07" className="contact-icon">
                <i className="fa-brands fa-github fa-2x"></i>
            </Link>
            <Link target="_blank" to="" className="contact-icon">
                <i className="fa-brands fa-youtube fa-2x"></i>
            </Link>
        </div>
    );
}

export default App;
