import React from 'react';

//css
import './SideMenuButton.css'
import '../../../main.css'

function App(props) {
    return (
        <div id='side-menu-btn' className='flexbox'>
            <button>{props.text}</button>
        </div>
    );
}

export default App;