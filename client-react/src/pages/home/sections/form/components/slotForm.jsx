import React, { useReducer, useContext, useState, useEffect } from 'react';
import axios from 'axios';

//css
import './slotForm.css'

//modules
import { validateDate, validateString } from '../../../../../utils/validaters';
import { renderDoctors } from '../../../../../utils/renderingFunctions';

//components
import { SlotContext } from '../../../../../store/slotContext';

function App(props) {

    const { date, doctor, slots, setDate, setDoctor, setSlots, setSlotsAvailable } = useContext(SlotContext)
    const [dateValid, setDateValid] = useState(true)
    const [doctorValid, setDoctorValid] = useState(false)
    const [formValid, setFormValid] = useState(false)

    const dateChangeHandler = (event) => {
        setDate(event.target.value)
        setSlotsAvailable(false)
    }

    const validateDateHandler = () => {
        setDateValid(validateDate(date))
        setFormValid(validateDate(date) && validateString(doctor))
    }

    const doctorChangeHandler = (event) => {
        setDoctor(event.target.value)
        setSlotsAvailable(false)

    }

    const validateDoctorHandler = () => {
        setDoctorValid(validateString(doctor))
        setFormValid(validateDate(date) && validateString(doctor))
    }

    const getSlots = async (event) => {
        event.preventDefault();

        if (formValid) {
            try {
                const request = await axios({
                    headers: {
                        'content-type': 'application/json'
                    },
                    method: 'post',
                    url: `http://localhost:8000/db/getSlots`,
                    data: {
                        date: date,
                        doctor: doctor
                    }
                })

                if (request.data.status === 'success') {
                    setSlots(request.data.slots)
                    setSlotsAvailable(true)
                }
            } catch (error) {
                alert('Error while sending Api request')
            }
        } else {
            alert('fill all fields')
        }
    }

    return (
        <form className='get-slot-form'>
            <div>
                <label style={{ display: 'block' }} htmlFor='date'>Date : </label>
                <input
                    id='date'
                    name='date'
                    placeholder='Select Date'
                    type='date'
                    value={date}
                    min={props.currentDate}
                    onChange={dateChangeHandler}
                    onBlur={validateDateHandler}
                />
            </div>
            <div>
                <label style={{ display: 'block' }} htmlFor='doctors' >Doctor : </label>
                <select
                    id='doctors'
                    name='doctor'
                    defaultValue='default'
                    onChange={doctorChangeHandler}
                    onBlur={validateDoctorHandler}
                >
                    <option value='default' disabled hidden>Select Doctor</option>
                    {renderDoctors()}
                </select>
            </div>
            <button
                onClick={getSlots}
            >
                Get Available Slots
            </button>
        </form>
    );
}

export default App;