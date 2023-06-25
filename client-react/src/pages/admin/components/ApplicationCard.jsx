import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { message } from "antd";

//css
import './ApplicationCard.css'

//modules
import { getToken } from '../../../utils/jwt';
import { slots } from '../../../config/data'
import { getIndianDate } from '../../../utils/helpers';
import axios from '../../../utils/axios'

function App(props) {

    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()
    const [render, setRender] = useState(false)
    const showModal = (type, msg, duration) => {

        messageApi.open({
            type: type,
            content: msg,
            duration: duration
        })
            .then(() => {
                navigate(0)
            })
    };

    const applicationApproveHandler = async () => {
        const token = getToken()
        let msg = ''
        let type = ''

        if (token) {
            try {
                const approvedPatient = await axios({
                    headers: {
                        'x-access-token': token
                    },
                    method: 'POST',
                    url: 'db/approveAppointment',
                    data: {
                        patientId: props.patientId
                    }
                })
                // console.log(approvedPatient.data);
                type = 'success'
                msg = 'Application Approved'
            } catch (error) {
                type = 'error'
                msg = 'Application Approve Failed'
            }
        } else {
            alert('You\'re not Authorized');
            navigate('/login', { replace: true })
        }
        showModal(type, msg, 1);
    }

    const applicationDeleteHandler = async () => {
        const token = getToken()
        let type = ''
        let msg = ''
        if (token) {
            try {
                const deletedPatient = await axios({
                    headers: {
                        'x-access-token': token
                    },
                    method: 'POST',
                    url: 'db/deleteAppointment',
                    data: {
                        patientId: props.patientId
                    }
                })
                // console.log(deletedPatient.data);
                //handle using if and else
                type = 'success'
                msg = 'Deleted Application Successfully'
            } catch (error) {
                // console.log('Error Occured while deleting application');
                type = 'error'
                msg = 'Deleting Application Failed'
            }
        } else {
            // console.log('Failed to get userToken.');
            alert('You\'re not Authorized')
            navigate('/login', { replace: true })
        }
        showModal(type, msg, 1)
    }

    return (
        <div id='application-card'>
            {contextHolder}
            <div className='application-name'>
                <i className="fa-regular fa-user"></i>
                {props.name}
            </div>
            <div className='application-phone'>
                <i className="fa-solid fa-phone"></i>
                {props.phone}
            </div>
            <div className='application-date'>
                <i className="fa-regular fa-calendar date-icon"></i>
                {getIndianDate(props.date) + '  : ' + slots[props.slot]}
            </div>
            {
                props.status === 'pending' ?
                    <div className='application-status'><span>Pending</span>
                        <button
                            onClick={applicationApproveHandler}
                        >
                            Approve
                        </button>
                    </div>
                    : <div className='application-status'>
                        <span>Appointment approved</span>
                    </div>
            }
            <div className='application-delete'>
                <button onClick={applicationDeleteHandler}>
                    <i className="fa-solid fa-trash fa-lg"></i>
                </button>
            </div>
        </div>
    );
}

export default App;