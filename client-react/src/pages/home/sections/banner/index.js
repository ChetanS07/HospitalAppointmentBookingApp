import React from 'react';

//css
import './index.css'
import '../../../../main.css'

//components
import BannerCard from './components/bannerCard'

const headings = ['Emergency Services', 'Outdoor Checkups', 'Highly Qualified Doctors']
const contents = [
    'Urgent care at your fingertips. Our hospital provides 24/7 emergency services to ensure prompt and reliable medical care whenever you need it',
    'Open Skies, Open Hearts: Experience the Freedom of Outdoor Checkups.Enjoy Outdoor Checkups in a Tranquil Environment,Revitalize in the Great Outdoors',
    'Unrivaled Excellence in Medical Care: Meet Our Team of Highly Skilled Doctors,Experience the Difference,Brilliance in Practice'
]

function App() {
    return (
        <section id='banner-section'>
            <div className='banner-wrapper flexbox'>
                <BannerCard heading={headings[0]} content={contents[0]} />
                <BannerCard heading={headings[1]} content={contents[1]} />
                <BannerCard heading={headings[2]} content={contents[2]} />
            </div>
        </section>
    );
}

export default App;