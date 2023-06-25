import React from 'react';

// css
import '../../../../../main.css'
import './doctorDiv.css'

// components
import SocialIcons from '../../../../../components/SocialIcons/SocialIcons'

function App(props) {
    return (
        <div className="doctor-card">
            <div className='flexbox doctor-card-inner-wrapper'>
                <div className='doctor-intro flexbox'>
                    <img src={props.img} className='doctor-img' />
                    <h2 className='zero-margin align-left'>{props.name}</h2>
                    <p className='zero-margin align-center'> {props.designation}</p>
                </div>
                <div className='doctor-description flexbox'>
                    <h2 className='zero-margin align-left'>{props.headlines}</h2>
                    <p className='zero-margin align-left'>
                        {props.about}
                    </p>
                    <SocialIcons />
                </div>
            </div>
        </div >
    );
}

export default App;