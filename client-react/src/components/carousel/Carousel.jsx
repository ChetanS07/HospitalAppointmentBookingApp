import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./carousel.css";

// import required modules
import { Navigation, Mousewheel, Autoplay } from "swiper";

export default function App() {
    return (
        <Swiper
            navigation={true}
            modules={[Navigation, Mousewheel, Autoplay]}
            className="mySwiper carousel"
            loop={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
        // mousewheel={true}
        >
            <SwiperSlide>
                <div className="carousel-slide-div">
                    Slide 1
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="carousel-slide-div">
                    Slide 2
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="carousel-slide-div">
                    Slide 3
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="carousel-slide-div">
                    Slide 4
                </div>
            </SwiperSlide>
        </Swiper>
    );
}