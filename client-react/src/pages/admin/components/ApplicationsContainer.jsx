import React, { useEffect, useState, useRef } from 'react';

//css
import './ApplicationsContainer.css'

//modules
import { doctors, today } from '../../../config/data';
import { validateString, validateDate, calculateDay } from '../../../utils/validaters'
import { renderDoctors } from '../../../utils/renderingFunctions';

//components
import ApplicationCard from '../components/ApplicationCard'

function App(props) {

    const dateRef = useRef()
    const dayRef = useRef()

    const [doctor, setDoctor] = useState('')
    const [date, setDate] = useState('')
    const [day, setDay] = useState('')

    const [patients, setPatients] = useState([])

    // console.log('showToday : ', props.showToday, ', showPending : ', props.showPending, ', showApproved : ', props.showApproved);
    // console.log('Doctor : ', doctor, ', Date : ', date, ', Day : ', day);
    // console.log('Doctor is :', Object.keys(doctors)[1]);
    // console.log('today is : ', today);

    // console.log('in applicationcontainer : ', patients);

    useEffect(() => {
        if (props.showToday)
            populateTodays()
        if (props.showPending)
            populatePending()
        if (props.showApproved)
            populateApproved()
    }, [props.showToday, props.showPending, props.showApproved])

    const populatePending = () => {
        const appl = []
        props.patients.map((app) => {
            if (app.status === 'pending')
                appl.push(app)
        })
        const sorted = appl.sort((a, b) => a.slot.localeCompare(b.slot))
        setPatients(sorted)
        // console.log('in populatePending : ', appl);
    }

    const populateApproved = () => {
        const appl = []
        props.patients.map((app) => {
            if (app.status === 'approved')
                appl.push(app)
        })
        const sorted = appl.sort((a, b) => a.slot.localeCompare(b.slot))
        setPatients(sorted)
        // console.log('in populateApproved : ', appl);
    }

    const populateTodays = () => {
        const appl = []
        props.patients.map((app) => {
            if (app.date === today)
                appl.push(app)
        })
        setPatients(appl)
        // console.log('in populateTodays : ', appl);
    }

    const renderApplications = () => {

        return patients.map(patient => {
            if (validateString(doctor) && validateString(day) && validateDate(date)) {
                console.log('condition met');
                if (patient.doctor === doctor && patient.date === date && day === calculateDay(patient.date)) {
                    return <ApplicationCard key={patient._id} doctor={patient.doctor} status={patient.status} slot={patient.slot} name={patient.name} phone={patient.phone} patientId={patient._id} />
                }
            } else if (validateString(doctor) && validateString(day)) {
                if (patient.doctor === doctor && day === calculateDay(patient.date)) {
                    return <ApplicationCard key={patient._id} doctor={patient.doctor} status={patient.status} slot={patient.slot} name={patient.name} phone={patient.phone} patientId={patient._id} />
                }
            } else if (validateString(doctor) && validateDate(date)) {
                if (patient.doctor === doctor && patient.date === date) {
                    return <ApplicationCard key={patient._id} doctor={patient.doctor} status={patient.status} slot={patient.slot} name={patient.name} phone={patient.phone} patientId={patient._id} />
                }
            } else if (validateString(day) && validateDate(date)) {
                if (patient.date === date && day === calculateDay(patient.date)) {
                    return <ApplicationCard key={patient._id} doctor={patient.doctor} status={patient.status} slot={patient.slot} name={patient.name} phone={patient.phone} patientId={patient._id} />
                }
            } else if (validateDate(date)) {
                if (patient.date === date) {
                    return <ApplicationCard key={patient._id} doctor={patient.doctor} status={patient.status} slot={patient.slot} name={patient.name} phone={patient.phone} patientId={patient._id} />
                }
            } else if (validateString(doctor)) {
                if (patient.doctor === doctor) {
                    return <ApplicationCard key={patient._id} doctor={patient.doctor} status={patient.status} slot={patient.slot} name={patient.name} phone={patient.phone} patientId={patient._id} />
                }
            } else if (validateString(day)) {
                if (day === calculateDay(patient.date)) {
                    return <ApplicationCard key={patient._id} doctor={patient.doctor} status={patient.status} slot={patient.slot} name={patient.name} phone={patient.phone} patientId={patient._id} />
                }
            } else {
                return <ApplicationCard key={patient._id} doctor={patient.doctor} status={patient.status} slot={patient.slot} name={patient.name} phone={patient.phone} patientId={patient._id} />
            }
        })
    }

    const doctorChangeHandler = (event) => {
        setDoctor(event.target.value)
    }

    const dateChangeHandler = (event) => {
        setDate(event.target.value)
        dayRef.current.value = ''
        setDay('')
    }
    const dayChangeHandler = (event) => {
        setDay(event.target.value)
        dateRef.current.value = ''
        setDate('')
    }

    return (
        <section id='applications-container'>
            {/* <h2>Applications</h2> */}
            <div className='sorting-options-wrapper'>
                <div>
                    <label className='doctor-option-label' htmlFor='doctor-option'>Select Doctor : </label>
                    <select
                        defaultValue={'default'}
                        id='doctor-option'
                        onChange={doctorChangeHandler}
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
                        onChange={dayChangeHandler}
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
                        onChange={dateChangeHandler}
                    />
                </div>
            </div>
            <div className='applications-wrapper'>
                {renderApplications()}
            </div>
        </section>
    );
}

export default App;