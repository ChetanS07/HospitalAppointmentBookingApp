import React, { useState } from 'react';

//css
import './StatusBoard.css'
import '../../../main.css'

//components
import StatusCard from '../components/StatusCard'

function App(props) {

    const [searchName, setSearchName] = useState('')

    const searchChangeHandler = (event) => {
        setSearchName(event.target.value)
    }

    const renderSearchResults = () => {
        if (props.patients.length > 0) {
            return props.patients.map(patient => {
                if (patient.includes(searchName)) {
                    return <div></div>
                }
            })
        }
    }

    return (
        <section id='status-board'>
            <div>
                <h2>Welcome</h2>
            </div>
            <div>
                <div className='search-bar'>
                    <input
                        type={'text'}
                        placeholder='Enter the Name of Patient'
                        className='search-input'
                        value={searchName}
                        onChange={searchChangeHandler}
                    />
                    <button
                        className='search-btn'
                    >Search</button>
                </div>
                <div className='search-results'>

                </div>
            </div>
        </section>
    );
}

export default App;