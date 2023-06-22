import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import doctor1 from '../../../../assets/doctor1.jpg'
import doctor2 from '../../../../assets/doctor2.jpg'

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation"

// styles
import './aboutDoctor.css'

// import required modules
import { Navigation, Mousewheel, Autoplay } from "swiper";

//components
import DoctorDiv from './components/doctorDiv'

const doctors = ['Dr. Chetan Shetter', 'Dr. Deepak Shetter']
const designations = ['ENT Specialist', 'Dentist']
const aboutDoctors = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
]


function App() {
    return (
        <section className='about-doctors'>
            <Swiper
                navigation={true}
                modules={[Navigation, Mousewheel, Autoplay]}
                className="mySwiper carousel"
                loop={true}
            // mousewheel={true}
            >
                <SwiperSlide>
                    <DoctorDiv
                        name={doctors[0]}
                        designation={designations[0]}
                        about={aboutDoctors[0]}
                        img={doctor1}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <DoctorDiv
                        name={doctors[1]}
                        designation={designations[1]}
                        about={aboutDoctors[1]}
                        img={doctor2}
                    />
                </SwiperSlide>
            </Swiper>
        </section>
    );
}

export default App;