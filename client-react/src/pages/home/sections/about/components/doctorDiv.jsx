import React from 'react';

// css
import '../../../../../main.css'
import './doctorDiv.css'

function App(props) {
    return (
        <div className="doctor-card flexbox">
            <div className='doctor-intro flexbox'>
                <img src={props.img} className='doctor-img' />
                <h2>{props.name}</h2>
                <p>{props.designation}</p>
            </div>
            <div className='doctor-description'>
                <p>
                    {props.about}
                </p>
            </div>
        </div>
    );
}

export default App;