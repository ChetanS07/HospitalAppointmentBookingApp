import React from 'react';

// styles 
import './aboutServices.css'

//components
import ServiceCard from './components/serviceCard'

const services = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
]
const classNames = [
    "fa-regular fa-hospital fa-2xl",
    "fa-regular fa-hospital fa-2xl",
    "fa-regular fa-hospital fa-2xl",
    "fa-regular fa-hospital fa-2xl",
    "fa-regular fa-hospital fa-2xl"
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