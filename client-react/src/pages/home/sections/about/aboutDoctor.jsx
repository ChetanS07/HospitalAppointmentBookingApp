import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import doctor1 from '../../../../assets/doctor1.jpg'
import doctor2 from '../../../../assets/doctor2.jpg'

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation"

// styles
import './aboutDoctor.css'
import '../../../../main.css'

// import required modules
import { Navigation, Mousewheel, Autoplay } from "swiper";

//components
import DoctorDiv from './components/doctorDiv'

const doctors = ['Dr. Chetan Shetter', 'Dr. Deepak Shetter']
const designations = ['ENT Specialist', 'Dentist']
const aboutDoctors = [
    'Dr. Chetan Shetter is a highly skilled and compassionate medical professional dedicated to providing exceptional care and improving the lives of patients. With 5 years of experience, Dr. Shetter possesses a deep understanding of Ear Nose Throat. Their expertise is complemented by a genuine passion for patient well-being and a commitment to delivering personalized treatment plans tailored to individual needs.With Dr. Shetter, patients can rest assured that they are in capable hands, receiving expert medical guidance, and compassionate support on their journey toward improved health and well-being.',
    'Dr. Deepak Shetter is a highly skilled and compassionate medical professional dedicated to providing exceptional care and improving the lives of patients. With 5 years of experience, Dr. Shetter possesses a deep understanding of Dentistry. Their expertise is complemented by a genuine passion for patient well-being and a commitment to delivering personalized treatment plans tailored to individual needs.With Dr. Shetter, patients can rest assured that they are in capable hands, receiving expert medical guidance, and compassionate support on their journey toward improved health and well-being.'
]
const doctorHeadlines = [
    'Your health advocate, your confidant – your doctor.',
    'Your health, my priority – together, we\'ll conquer.'
]


function App() {
    return (
        <section className='about-doctors'>
            <Swiper
                navigation={true}
                modules={[Navigation, Mousewheel, Autoplay]}
                className="mySwiper"
                loop={true}
            // mousewheel={true}
            >
                <SwiperSlide>
                    <DoctorDiv
                        name={doctors[0]}
                        designation={designations[0]}
                        headlines={doctorHeadlines[0]}
                        about={aboutDoctors[0]}
                        img={doctor1}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <DoctorDiv
                        name={doctors[1]}
                        designation={designations[1]}
                        headlines={doctorHeadlines[1]}
                        about={aboutDoctors[1]}
                        img={doctor2}
                    />
                </SwiperSlide>
            </Swiper>
        </section>
    );
}

export default App;