import React, { useRef } from 'react';

//css
import './SortingComponent.css'
import '../../../main.css'

//modules
import { renderDoctors } from '../../../utils/renderingFunctions';

function App(props) {

    const dateRef = useRef()
    const dayRef = useRef()

    return (
        <div className='sorting-options-wrapper'>
            <div>
                <label className='doctor-option-label' htmlFor='doctor-option'>Select Doctor : </label>
                <select
                    defaultValue={'default'}
                    id='doctor-option'
                    onChange={props.doctorChangeHandler}
                >
                    <option value={'default'} disabled hidden>Select Doctor</option>
                    {renderDoctors()}
                </select>
            </div>
            <div>
                <label className='day-option-label' htmlFor='day-option'>Select By Day : </label>
                <select
                    defaultValue={'default'}
                    id='day-option'
                    ref={dayRef}
                    onChange={(event) => {
                        dateRef.current.value = ''
                        props.dayChangeHandler(event)
                    }}
                >
                    <option value={'default'} disabled hidden>Select Day</option>
                    <option value='past'>Past Days</option>
                    <option value='today'>Today</option>
                    <option value='future'>Upcoming Days</option>
                </select>
            </div>
            <div>
                <label className='date-label' htmlFor='date-option'>Select By Date : </label>
                <input
                    type={'date'}
                    id='date-input'
                    ref={dateRef}
                    onChange={(event) => {
                        dayRef.current.value = ''
                        props.dateChangeHandler(event)
                    }}
                />
            </div>
        </div>
    );
}

export default App;