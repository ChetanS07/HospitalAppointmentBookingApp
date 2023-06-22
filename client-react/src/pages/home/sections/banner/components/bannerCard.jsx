import React from 'react';

//css
import './bannerCard.css'

function App(props) {
    return (
        <article className='banner-card flexbox'>
            <h2>{props.heading}</h2>
            <p>{props.content}</p>
        </article>
    );

}

export default App;