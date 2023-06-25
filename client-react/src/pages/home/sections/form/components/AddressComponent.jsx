import React from 'react';

//css
import './AddressComponent.css'
import '../../../../../main.css'

function App() {
    return (
        <section id='address-section'>
            <div className='address-wrapper flexbox'>
                <div className='details-article-wrapper flexbox'>
                    <article>
                        <h3 className='zero-margin'>Opening Hours</h3>
                        <p><i className="fa-regular fa-clock fa-xl"></i>10 Am : 8 Pm</p>
                    </article>
                    <article>
                        <h3 className='zero-margin'>Working Days</h3>
                        <p><i className="fa-regular fa-calendar fa-xl"></i>All Days</p>
                    </article>

                </div>
                <div className='address-article flexbox'>
                    <div>
                        <p><i className="fa-solid fa-location-dot fa-2xl"></i></p>
                        <br></br>
                        <h2 className='align-center hospital-name'>Health Care</h2>
                        <p className='hospital-tag'>A sanctuary of wellness.</p>
                    </div>
                    <div className='hospital-address'>
                        <p style={{ padding: '0 2rem' }}> No:62, Richmond Road, Mother Teresa Rd, Richmond Town, Bengaluru, Karnataka 560025</p>
                        <p><i className="fa-solid fa-phone fa-xl"></i> +080-123456</p>
                        <p><i className="fa-regular fa-envelope fa-xl"></i> healthcare@gmail.com</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default App;