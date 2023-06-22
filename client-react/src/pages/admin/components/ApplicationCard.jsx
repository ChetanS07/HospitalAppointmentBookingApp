import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//css
import './ApplicationCard.css'

//modules
import { getToken } from '../../../utils/jwt';
import { slots } from '../../../config/data'

function App(props) {

    const navigate = useNavigate()

    //test functions

    const applicationApproveHandler = async () => {
        const token = getToken()
        if (token) {
            try {
                const approvedPatient = await axios({
                    headers: {
                        'content-Type': 'application/json',
                        'x-access-token': token
                    },
                    method: 'POST',
                    url: 'http://localhost:8000/db/approveAppointment',
                    data: {
                        patientId: props.patientId
                    }
                })
                console.log(approvedPatient.data);
            } catch (error) {
                alert('error')
            }
        } else {
            console.log('Failed to get userToken.');
            navigate('/login', { replace: true })
        }
        navigate(0)
    }

    const applicationDeleteHandler = async () => {
        const token = getToken()
        console.log(token);
        if (token) {
            try {
                const deletedPatient = await axios({
                    headers: {
                        "Content-Type": 'application/json',
                        'x-access-token': token
                    },
                    method: 'POST',
                    url: 'http://localhost:8000/db/deleteAppointment',
                    data: {
                        patientId: props.patientId
                    }
                })
                console.log(deletedPatient.data);
            } catch (error) {
                console.log('Error Occured while deleting application');
                alert('error')
            }
        } else {
            console.log('Failed to get userToken.');
            navigate('/login', { replace: true })
        }
        navigate(0)
    }

    return (
        <div id='application-card'>
            <div className='application-name'><i className="fa-regular fa-user"></i>{props.name}</div>
            <div className='application-phone'><i className="fa-solid fa-phone"></i>{props.phone}</div>
            <div className='application-slot'>{slots[props.slot]}</div>
            {
                props.status === 'pending' ?
                    <div className='application-status'><span>Appointment Pending</span>
                        <button
                            onClick={applicationApproveHandler}
                        >
                            approve
                        </button>
                    </div>
                    : <div className='application-status'>
                        <span>Appointment approved</span>
                    </div>
            }
            <div className='application-delete'>
                <button onClick={applicationDeleteHandler}>
                    <i className="fa-solid fa-trash fa-xl"></i>
                </button>
            </div>
        </div>
    );
}

export default App;