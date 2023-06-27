import React, { useReducer, useContext, useState, useEffect } from 'react';
// import axios from 'axios';
import { message } from "antd";

//css
import './slotForm.css'
import '../../../../../main.css'

//modules
import { validateDate, validateString } from '../../../../../utils/validaters';
import { renderDoctors } from '../../../../../utils/renderingFunctions';
import axios from '../../../../../utils/axios';

//components
import { SlotContext } from '../../../../../store/slotContext';

function App(props) {

    const [messageApi, contextHolder] = message.useMessage();
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

    const showModal = (type, msg) => {
        messageApi.open({
            type: type,
            content: msg
        });
    }

    const showLoading = () => {
        messageApi.open({
            type: 'loading',
            content: 'Getting Slots, This may take few Seconds...',
            duration: 0
        })
    }

    const getSlots = async (event) => {
        event.preventDefault();

        if (formValid) {
            // try {
            // const request = await axios({
            //     method: 'post',
            //     url: 'db/getSlots',
            //     data: {
            //         date: date,
            //         doctor: doctor
            //     }
            // })
            // if (request.data.status === 'success') {
            //     setSlots(request.data.slots)
            //     setSlotsAvailable(true)
            // }
            showLoading()

            axios({
                method: 'post',
                url: 'db/getSlots',
                data: {
                    date: date,
                    doctor: doctor
                }
            }).then((request) => {
                if (request.data.status === 'success') {
                    setSlots(request.data.slots)
                    setSlotsAvailable(true)
                    messageApi.destroy()
                }
            }).catch((err) => {
                showModal('error', 'Failed to get Slots. Server Error, Try Again Later')
            })

            // } catch (error) {
            // showModal('error', 'Failed to get Slots. Server Error, Try Again Later')
            // }
        } else {
            showModal('warning', 'Fill all the credentials')
        }
    }

    return (
        <form className='get-slot-form flexbox' >
            {contextHolder}
            <div className='date-wrapper'>
                <label className='date-label' htmlFor='date'>Select Date : </label>
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
            <div className='doctor-wrapper'>
                <label className='doctor-label' htmlFor='doctor' >Choose Doctor : </label>
                <select
                    id='doctor'
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
                className='get-slots-btn'
                onClick={getSlots}
            >
                Get Available Slots
            </button>
        </form >
    );
}

export default App;