import React, { useReducer, useContext, useState, useEffect } from 'react';
// import axios from 'axios';
import { message } from "antd";

//css
import './requestForm.css'

//modules
import { nameReducer, phoneReducer, slotReducer } from '../../../../../utils/reducers'
import { validateDate, validateObject, validatePhone, validateString } from '../../../../../utils/validaters'
import axios from '../../../../../utils/axios';

//components
import { SlotContext } from '../../../../../store/slotContext';

const slotValues = ['slot1', 'slot2', 'slot3', 'slot4']
const slotsInfo = {
    'slot1': '10 AM - 12 PM',
    'slot2': '12 PM - 02 PM',
    'slot3': '04 PM - 06 PM',
    'slot4': '06 PM - 08 PM'
}

const date = new Date()
const hour = new Date(date).getHours().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })

function App(props) {

    const [messageApi, contextHolder] = message.useMessage();
    const { date, doctor, slots, slotsAvailable, setSlotsAvailable } = useContext(SlotContext)
    const [nameState, dispatchName] = useReducer(nameReducer, { value: '', isValid: false })
    const [phoneState, dispatchPhone] = useReducer(phoneReducer, { value: '', isValid: false })
    const [slotState, dispatchSlot] = useReducer(slotReducer, { value: 'default', isValid: false })
    const [formValid, setFormValid] = useState(false)

    //name
    const nameChangeHanlder = (event) => {
        dispatchName({ type: 'USER_INPUT', val: event.target.value })
    }

    const validateNameHandler = (event) => {
        dispatchName({ type: 'INPUT_BLUR' });
        setFormValid(validateDate(date) && validateString(doctor) && validateString(nameState) && phoneState.isValid && slotState.isValid)

    }

    //phone
    const phoneChangeHanlder = (event) => {
        dispatchPhone({ type: 'USER_INPUT', val: event.target.value })
    }

    const validatePhoneHandler = (event) => {
        dispatchPhone({ type: 'INPUT_BLUR' });
        setFormValid(validateDate(date) && validateString(doctor) && nameState.isValid && validatePhone(phoneState) && slotState.isValid)

    }

    //slot
    const slotChangeHanlder = (event) => {
        dispatchSlot({ type: 'USER_INPUT', val: event.target.value })
    }

    const validateSlotHandler = (event) => {
        dispatchSlot({ type: 'INPUT_BLUR' });
        setFormValid(validateDate(date) && validateString(doctor) && nameState.isValid && phoneState.isValid && validateString(slotState))
    }

    const renderSlots = () => {
        //render todays slots according to time
        if (validateObject(slots)) {
            // slots object is not empty
            return Object.keys(slotsInfo).map(slot => {
                if (slots[slot].length < 5) {
                    return <option key={slot} value={slot}>{slotsInfo[slot]}</option>
                } {
                    return <option key={slot} disabled>{slotsInfo[slot]} (Not Available)</option>
                }
            })
        } else {
            //slots object is empty
            return Object.keys(slotsInfo).map(slot => (<option key={slot} value={slot}>{slotsInfo[slot]}</option>))
        }
    }

    const showModal = (type, msg) => {
        messageApi.open({
            type: type,
            content: msg
        });
    }

    const requestAppointment = async (event) => {
        event.preventDefault()

        if (formValid) {
            try {
                const request = await axios({
                    method: 'post',
                    url: `db/bookAppointment`,
                    data: {
                        date: date,
                        name: nameState.value,
                        doctor: doctor,
                        slot: slotState.value,
                        phone: phoneState.value
                    }
                })
                if (request.data.status === 'success') {
                    // console.log('requested appointment successfully');
                    dispatchPhone({ type: 'USER_INPUT', val: '' })
                    dispatchName({ type: 'USER_INPUT', val: '' })
                    dispatchSlot({ type: 'USER_INPUT', val: 'default' })
                    showModal('success', 'Requested for Appointment Successfully')
                } else {
                    showModal('error', 'Failed to Book Appointment, Try Again Later')
                }
                setSlotsAvailable(false)
            } catch (error) {
                showModal('error', 'Failed to Book Appointment. Server Error, Try Again Later')
                setSlotsAvailable(false)
            }
        } else {
            showModal('warning', 'Fill all the Details')
        }

    }

    return (
        <>
            {contextHolder}
            <form className='request-appointment-form' disabled='disabled'>
                <div>
                    <label >Name </label>
                    <input
                        disabled={slotsAvailable ? '' : 'disabled'}
                        className='name-input'
                        type={'text'}
                        placeholder='Enter Your Name'
                        name='patientName'
                        value={nameState.value}
                        onChange={nameChangeHanlder}
                        onBlur={validateNameHandler}
                    />
                </div>
                <div>
                    <label >Phone  </label>
                    <input
                        disabled={slotsAvailable ? '' : 'disabled'}
                        className='name-input'
                        type={'text'}
                        value={phoneState.value}
                        placeholder='Enter Your Phone No.'
                        name='phoneNo'
                        onChange={phoneChangeHanlder}
                        onBlur={validatePhoneHandler}
                    />
                </div>
                <div>
                    <label style={{ display: 'block' }} htmlFor='slots'>Select slot </label>
                    <select
                        disabled={slotsAvailable ? '' : 'disabled'}
                        id='slots'
                        name='slot'
                        value={slotState.value}
                        defaultValue={'default'}
                        onChange={slotChangeHanlder}
                        onBlur={validateSlotHandler}
                    >
                        <option value={'default'} disabled hidden>Select Slot</option>
                        <>{renderSlots()}</>
                    </select>
                </div>
                <button
                    disabled={slotsAvailable ? '' : 'disabled'}
                    className='request-btn'
                    onClick={requestAppointment}
                >
                    Request an Appointment
                </button>
            </form>

        </>

    );
}

export default App;