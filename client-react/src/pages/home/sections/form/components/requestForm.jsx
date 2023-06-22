import React, { useReducer, useContext, useState, useEffect } from 'react';
import axios from 'axios';

//css
import './requestForm.css'

//modules
import { nameReducer, phoneReducer, slotReducer } from '../../../../../utils/reducers'
import { validateDate, validateObject, validatePhone, validateString } from '../../../../../utils/validaters'

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

    console.log('Hour is : ', hour);

    const { date, doctor, slots, slotsAvailable, setSlotsAvailable } = useContext(SlotContext)
    const [nameState, dispatchName] = useReducer(nameReducer, { value: '', isValid: false })
    const [phoneState, dispatchPhone] = useReducer(phoneReducer, { value: '', isValid: false })
    const [slotState, dispatchSlot] = useReducer(slotReducer, { value: '', isValid: false })
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

    const requestAppointment = async (event) => {
        event.preventDefault()

        if (formValid) {
            try {
                const request = await axios({
                    headers: {
                        'content-type': 'application/json'
                    },
                    method: 'post',
                    url: `http://localhost:8000/db/bookAppointment`,
                    data: {
                        date: date,
                        name: nameState.value,
                        doctor: doctor,
                        slot: slotState.value,
                        phone: phoneState.value
                    }
                })
                if (request.data.status === 'success') {
                    console.log('requested appointment successfully');
                }
            } catch (error) {
                alert('failed to send api request')
            }
        } else {
            alert('fill all fields')
        }
        setSlotsAvailable(false)
    }

    return (
        <>
            {slotsAvailable && <form className='request-appointment-form'>
                <div>
                    <label style={{ display: 'block' }} >Name</label>
                    <input
                        type={'text'}
                        placeholder='Enter Your Name'
                        name='patientName'
                        onChange={nameChangeHanlder}
                        onBlur={validateNameHandler}
                    />
                </div>
                <div>
                    <label style={{ display: 'block' }} >Phone No.</label>
                    <input
                        type={'text'}
                        placeholder='Enter Your Phone No.'
                        name='phoneNo'
                        onChange={phoneChangeHanlder}
                        onBlur={validatePhoneHandler}
                    />
                </div>
                <div>
                    <label style={{ display: 'block' }} htmlFor='slots'>Select slots</label>
                    <select
                        id='slots'
                        name='slot'
                        defaultValue={'default'}
                        onChange={slotChangeHanlder}
                        onBlur={validateSlotHandler}
                    >
                        <option value={'default'} disabled hidden>Select Slot</option>
                        <>{renderSlots()}</>
                    </select>
                </div>
                <button
                    onClick={requestAppointment}
                >
                    Request an Appointment
                </button>
            </form>
            }
        </>

    );
}

export default App;