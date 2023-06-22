import React from 'react';
import hopitalBuilding from '../../../../assets/hospitalBuilding.jpg'

// styles
import './aboutHospital.css'

function App() {
    return (
        <>
            <article className='about-hospital flexbox'>
                <img className='hospital-img' src={hopitalBuilding} />
                <div className='hospital-info flexbox'>
                    <h2>Hospital name</h2>
                    <p>    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    <button className='hospital-info-btn'>Learn More...</button>
                </div>
            </article>
        </>
    );
}

export default App;