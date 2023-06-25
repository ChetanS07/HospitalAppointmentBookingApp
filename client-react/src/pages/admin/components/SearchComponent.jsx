import React from 'react';

//css
import './SearchComponent.css'

function App(props) {
    return (
        <section id='search-section'>
            <div className='search-heading-wrapper'>
                <h2>Welcome</h2>
            </div>
            <div className='search-bar'>
                <div className='search-input-wrapper'>
                    <i className="fa-solid fa-magnifying-glass fa-xl"></i>
                    <input
                        type={'text'}
                        placeholder='Enter the Name of Patient'
                        className='search-input'
                        value={props.searchName}
                        onChange={props.searchChangeHandler}
                    /></div>
            </div>
        </section>
    );
}

export default App;
