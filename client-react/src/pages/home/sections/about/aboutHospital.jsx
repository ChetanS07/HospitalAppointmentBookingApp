import React from 'react';
import hopitalBuilding from '../../../../assets/hospitalBuilding.jpg'

// styles
import './aboutHospital.css'
import '../../../../main.css'

function App() {
    return (
        <>
            <article className='about-hospital flexbox'>
                <img className='hospital-img' src={hopitalBuilding} />
                <div className='hospital-info flexbox'>
                    <h2 className='hospital-name align-left zero-margin'>Health Care</h2>
                    <h3 className='hospital-tag align-left zero-margin'>Caring for You, Healing with Compassion</h3>
                    <p>
                        Welcome to our hospital, where compassionate care and medical excellence intertwine. We are dedicated to providing a healing environment where patients' well-being is at the forefront of everything we do.

                        With a team of highly skilled doctors, nurses, and healthcare professionals, we strive to deliver exceptional medical care that surpasses expectations. Our state-of-the-art facility is equipped with cutting-edge technology, enabling accurate diagnoses and advanced treatment options.

                        At our hospital, we prioritize patient comfort, ensuring that every aspect of your experience is met with warmth and understanding.
                    </p>
                    {/* <button className='hospital-info-btn'>Learn More...</button> */}
                </div>
            </article>
        </>
    );
}

export default App;