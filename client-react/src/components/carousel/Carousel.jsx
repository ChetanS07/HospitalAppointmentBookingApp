import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./carousel.css";
import '../../main.css'

// import required modules
import { Navigation, Mousewheel, Autoplay } from "swiper";

export default function App() {

    const scrollToForm = () => {
        window.scroll({ top: document.getElementById("form-section").offsetTop - 84 });
    }

    return (
        <Swiper
            navigation={true}
            modules={[Navigation, Mousewheel, Autoplay]}
            className="mySwiper carousel"
            loop={true}
        // autoplay={{
        //     delay: 5000,
        //     disableOnInteraction: false,
        // }}
        // mousewheel={true}
        >
            <SwiperSlide>
                <div className="carousel-slide-div flexbox car-div1">
                    <p className="zero-margin">Committed to Your Wellbeing,Every Step of the Way</p>
                    <button>Know About Us</button>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="carousel-slide-div flexbox car-div2">
                    <p className="zero-margin">Your path to wellness starts with a simple click,
                        <br /><span>Book your appointment today!</span>
                    </p>
                    <button onClick={scrollToForm}>Book Your Appointment</button>
                </div>
            </SwiperSlide>
        </Swiper>
    );
}