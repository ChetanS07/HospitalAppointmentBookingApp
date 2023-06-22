import React from 'react';

//components
import Navbar from '../../components/header/Navbar'
import HeroSection from './sections/hero/HeroSection'
import Banner from './sections/banner/index'
import AboutSection from './sections/about/index'
import FormSection from './sections/form/index'

function App() {
    return (
        <React.Fragment>
            <Navbar />
            <HeroSection />
            <Banner />
            <AboutSection />
            <FormSection />
        </React.Fragment>
    );
}

export default App;