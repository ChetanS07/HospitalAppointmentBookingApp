import React from 'react';
import { useRef } from 'react'

//components
import Navbar from '../../components/header/Navbar'
import HeroSection from './sections/hero/HeroSection'
import Banner from './sections/banner/index'
import AboutSection from './sections/about/index'
import FormSection from './sections/form/index'
import Footer from '../../components/footer/Footer'
import Copyright from '../../components/footer/Copyright'

function App() {

    return (
        <React.Fragment>
            <Navbar />
            <HeroSection />
            <Banner />
            <AboutSection />
            <FormSection />
            <Footer />
            <Copyright />
        </React.Fragment>
    );
}

export default App;