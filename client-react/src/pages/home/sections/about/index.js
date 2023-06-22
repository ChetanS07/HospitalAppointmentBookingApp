import React from 'react';

import './index.css'

// import components
import AboutHospital from './aboutHospital'
import AboutDoctor from './aboutDoctor'
import AboutServices from './aboutServices'

function App() {
    return (
        <section id='about-section'>
            <AboutHospital />
            <AboutDoctor />
            <AboutServices />
        </section>
    );
}

export default App;