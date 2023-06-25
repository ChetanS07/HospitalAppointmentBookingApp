import React from 'react';

// styles 
import './aboutServices.css'

//components
import ServiceCard from './components/serviceCard'

const services = [
    'Urgent Care, Unwavering Support: Our Hospital\'s Emergency Services',
    'Rapid Response, Lifesaving Care: Our Ambulance Service at Your Service',
    'Your health, our priority, Now available through our online consultation service.',
    'Compassionate Care, Expert Hands: Our Dedicated Doctors and Nurses',
    'Excellence in Infrastructure, Compassion in Care: Welcome to Our Hospital Facility',
]
const classNames = [
    "fa-solid fa-kit-medical fa-2xl",
    "fa-solid fa-truck-medical fa-2xl",
    "fa-solid fa-mobile-screen fa-2xl",
    "fa-solid fa-user-doctor fa-2xl",
    "fa-solid fa-bed fa-2xl"
]

function App() {
    return (
        <section className='about-services'>
            <ServiceCard service={services[0]} iconClass={classNames[0]} />
            <ServiceCard service={services[1]} iconClass={classNames[1]} />
            <ServiceCard service={services[2]} iconClass={classNames[2]} />
            <ServiceCard service={services[3]} iconClass={classNames[3]} />
            <ServiceCard service={services[4]} iconClass={classNames[4]} />
        </section>
    );
}

export default App;