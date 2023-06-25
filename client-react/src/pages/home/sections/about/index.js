import React from 'react';

import './index.css'
import '../../../../main.css'

// import components
import AboutHospital from './aboutHospital'
import AboutDoctor from './aboutDoctor'
import AboutServices from './aboutServices'

function App() {
    return (
        <section id='about-section'>
            <AboutHospital />
            <h1>Meet Our Elite Doctors</h1>
            <AboutDoctor />
            <h1>Our Services</h1>
            <AboutServices />
        </section>
    );
}

export default App;