import React from 'react';

//css
import './StatusCard.css'
import '../../../main.css'

function App(props) {
    return (
        <div id='status-card' className='flexbox'>
            <h3>{props.heading}</h3>
            <p>{props.body}</p>
        </div>
    );
}

export default App;