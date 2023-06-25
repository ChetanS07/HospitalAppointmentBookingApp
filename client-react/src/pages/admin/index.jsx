import React, { useEffect, useState, useRef } from 'react';
import { decodeToken, isExpired } from 'react-jwt'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios'

//css
import './index.css'
import '../../main.css'

//modules
import { today } from '../../config/data';
import axios from '../../utils/axios';

//components
import Navbar from '../../components/header/Navbar'
import SideMenu from './sections/SideMenu'
import ApplicationsContainer from './sections/ApplicationsContainer';

const PENDING = 'pending'
const APPROVED = 'approved'
const TODAY = today
const ALL = 'all'


// const appointments = [
//     {
//         _id: '6493e2e93643326dd9d53c66',
//         name: 'chetan',
//         phone: '1234567890',
//         date: '2023-06-30',
//         slot: 'slot1',
//         doctor: 'deepak',
//         status: 'approved'
//     },
//     {
//         _id: '6493e2e93643326dd9d53c66',
//         name: 'chetan1',
//         phone: '1234567890',
//         date: '2023-06-30',
//         slot: 'slot1',
//         doctor: 'deepak',
//         status: 'pending'
//     },
//     {
//         _id: '6493e2e93643326dd9d53c66',
//         name: 'chetan2',
//         phone: '1234567890',
//         date: '2023-06-30',
//         slot: 'slot1',
//         doctor: 'deepak',
//         status: 'pending'
//     },
//     {
//         _id: '6493e2e93643326dd9d53c66',
//         name: 'chetan1',
//         phone: '1234567890',
//         date: '2023-06-30',
//         slot: 'slot1',
//         doctor: 'deepak',
//         status: 'pending'
//     },
//     {
//         _id: '6493e2e93643326dd9d53c66',
//         name: 'chetan1',
//         phone: '1234567890',
//         date: '2023-06-30',
//         slot: 'slot1',
//         doctor: 'deepak',
//         status: 'pending'
//     },
//     {
//         _id: '6493e2e93643326dd9d53c66',
//         name: 'chetan1',
//         phone: '1234567890',
//         date: '2023-06-30',
//         slot: 'slot1',
//         doctor: 'deepak',
//         status: 'pending'
//     },
//     {
//         _id: '6493e2e93643326dd9d53c66',
//         name: 'chetan1',
//         phone: '1234567890',
//         date: '2023-06-30',
//         slot: 'slot1',
//         doctor: 'deepak',
//         status: 'pending'
//     },

//     {
//         _id: '6493e2e93643326dd9d53c66',
//         name: 'chetan1',
//         phone: '1234567890',
//         date: '2023-06-30',
//         slot: 'slot1',
//         doctor: 'deepak',
//         status: 'pending'
//     },
//     {
//         _id: '6493e2e93643326dd9d53c66',
//         name: 'chetan1',
//         phone: '1234567890',
//         date: '2023-06-30',
//         slot: 'slot1',
//         doctor: 'deepak',
//         status: 'pending'
//     },
//     {
//         _id: '6493e2e93643326dd9d53c66',
//         name: 'chetan1',
//         phone: '1234567890',
//         date: '2023-06-30',
//         slot: 'slot1',
//         doctor: 'deepak',
//         status: 'pending'
//     },
// ]

function App() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.isAuth)
    const inAdmin = useSelector(state => state.inAdmin)
    const [appointments, setAppointments] = useState([])
    const [show, setShow] = useState(TODAY)

    useEffect(() => {
        const token = localStorage.getItem('userToken')
        if (token) {
            const user = decodeToken(token)
            if (!user && isExpired(token)) {
                localStorage.removeItem('userToken')
                dispatch({ type: 'UNAUTHORIZED' })
                navigate('/login', { replace: true })
            } else {
                dispatch({ type: 'IN_ADMIN_PAGE', user: user.userToken })
                getShows()
                getAppointments()
            }
        } else {
            dispatch({ type: 'UNAUTHORIZED' })
            navigate('/login', { replace: true })
        }
    }, [show])

    console.log('IN ADMIN : ', inAdmin);

    const getShows = () => {
        const shows = localStorage.getItem('shows')
        if (shows) {
            // console.log('shows : ', shows);
            setShow(shows)
        }
    }

    const getAppointments = async () => {
        const token = localStorage.getItem('userToken')
        try {
            const req = await axios({
                headers: {
                    'x-access-token': token
                },
                method: 'get',
                url: 'db/getAppointments'
            })
            setAppointments(prevData => (req.data.patients))
        } catch (error) {
            alert('error')
        }
    }

    const showTodayHandler = () => {
        setShow(TODAY)
    }

    const showPendingHandler = () => {
        setShow(PENDING)
    }

    const showApprovedHandler = () => {
        setShow(APPROVED)
    }

    const showAllHandler = () => {
        setShow(ALL)
    }

    return (
        <div id='admin-dashboard'>
            <Navbar />
            <section className='flexbox'>
                <SideMenu show={show} showToday={showTodayHandler} showAll={showAllHandler} showApproved={showApprovedHandler} showPending={showPendingHandler} />
                <div className='dashboard-section'>
                    {appointments.length > 0
                        ? <ApplicationsContainer patients={appointments} show={show} />
                        : <h1>No Applications</h1>
                    }
                </div>
            </section >
        </div >
    );
}

export default App;