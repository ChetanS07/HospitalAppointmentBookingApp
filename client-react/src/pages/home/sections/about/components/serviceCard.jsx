import React from 'react';

import './serviceCard.css'

function App(props) {
    return (
        <div className='service-card flexbox'>
            <i className={props.iconClass}></i>
            {props.service}
        </div >
    );
}

export default App;