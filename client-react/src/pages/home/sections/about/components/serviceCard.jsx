import React from 'react';

import './serviceCard.css'

function App(props) {
    return (
        <div className='service-card flexbox'>
            <i className={props.iconClass}></i>
            <p>{props.service}</p>
        </div >
    );
}

export default App;