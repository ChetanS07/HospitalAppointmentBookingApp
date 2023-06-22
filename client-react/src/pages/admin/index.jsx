import React, { useEffect, useState, useRef } from 'react';
import { decodeToken, isExpired } from 'react-jwt'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'

//css
import './index.css'
import '../../main.css'

//components
import Navbar from '../../components/header/Navbar'
import StatusBoard from './sections/StatusBoard'
import SideMenu from './sections/SideMenu'
import ApplicationsContainer from './components/ApplicationsContainer';

function App() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.isAuth)

    const todayButton = useRef(null)
    const pendingButton = useRef(null)
    const approveButton = useRef(null)

    const [appointments, setAppointments] = useState([])
    const [showToday, setShowToday] = useState(true)
    const [showPending, setShowPending] = useState(false)
    const [showApproved, setShowApproved] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('userToken')
        if (token) {
            const user = decodeToken(token)
            if (!user && isExpired(token)) {
                localStorage.removeItem('userToken')
                dispatch({ type: 'UNAUTHORIZED' })
                navigate('/login', { replace: true })
            } else {
                dispatch({ type: 'LOGIN', user: user.userToken })
                getAppointments()
            }
        } else {
            dispatch({ type: 'UNAUTHORIZED' })
            navigate('/login', { replace: true })
        }
    }, [])

    const getAppointments = async () => {
        const token = localStorage.getItem('userToken')
        try {
            const req = await axios({
                headers: {
                    "Content-Type": 'application/json',
                    'x-access-token': token
                },
                method: 'get',
                url: 'http://localhost:8000/db/getAppointments'
            })
            setAppointments(prevData => (req.data.patients))
        } catch (error) {
            alert('error')
        }
    }

    const showTodayHandler = () => {
        setShowToday(true)
        setShowApproved(false)
        setShowPending(false)
        todayButton.current.classList.add('btn-active')
        pendingButton.current.classList.remove('btn-active')
        approveButton.current.classList.remove('btn-active')
    }

    const showPendingHandler = () => {
        setShowToday(false)
        setShowApproved(false)
        setShowPending(true)
        todayButton.current.classList.remove('btn-active')
        pendingButton.current.classList.add('btn-active')
        approveButton.current.classList.remove('btn-active')
    }

    const showApprovedHandler = () => {
        setShowToday(false)
        setShowApproved(true)
        setShowPending(false)
        todayButton.current.classList.remove('btn-active')
        pendingButton.current.classList.remove('btn-active')
        approveButton.current.classList.add('btn-active')
    }

    return (
        <div id='admin-dashboard'>
            <Navbar />
            <section className='flexbox'>
                <SideMenu showToday={showTodayHandler} showApproved={showApprovedHandler} showPending={showPendingHandler} todayButton={todayButton} pendingButton={pendingButton} approveButton={approveButton} />
                <div className='dashboard-section'>
                    <StatusBoard patients={appointments} />
                    {appointments.length > 0
                        ? <ApplicationsContainer patients={appointments} showToday={showToday} showPending={showPending} showApproved={showApproved} />
                        : <ApplicationsContainer patients={[]} />
                    }
                </div>
            </section >
        </div >
    );
}

export default App;