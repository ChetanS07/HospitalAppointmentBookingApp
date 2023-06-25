import React, { useEffect, useState, useRef } from 'react';

//css
import './ApplicationsContainer.css'
import '../../../main.css'

//modules
import { doctors, today } from '../../../config/data';
import { validateString, validateDate, calculateDay } from '../../../utils/validaters'
import { sortApplications } from '../../../utils/helpers';

//components
import ApplicationCard from '../components/ApplicationCard'
import SortingComponent from '../components/SortingComponent'
import SearchSection from '../components/SearchComponent'

const PENDING = 'pending'
const APPROVED = 'approved'
const TODAY = today
const ALL = 'all'

function App(props) {

    const dateRef = useRef()
    const dayRef = useRef()

    const [doctor, setDoctor] = useState('')
    const [date, setDate] = useState('')
    const [day, setDay] = useState('')
    const [searchName, setSearchName] = useState('')
    // const [del, setDel] = useState(false)

    const [patients, setPatients] = useState([])

    // console.log('showToday : ', props.showToday, ', showPending : ', props.showPending, ', showApproved : ', props.showApproved);
    // console.log('Doctor : ', doctor, ', Date : ', date, ', Day : ', day);
    // console.log('Doctor is :', Object.keys(doctors)[1]);
    // console.log('today is : ', today);
    // console.log('show : ', props.show);

    useEffect(() => {
        if (props.show === TODAY)
            populateTodays()
        if (props.show === PENDING)
            populatePending()
        if (props.show === APPROVED)
            populateApproved()
        if (props.show === ALL)
            setPatients(sortApplications(props.patients))
    }, [props.show])

    const populatePending = () => {
        const appl = []
        props.patients.map((app) => {
            if (app.status === 'pending')
                appl.push(app)
        })
        const sorted = sortApplications(appl)
        setPatients(sorted)
        // console.log('in populatePending : ', sorted);
    }

    const populateApproved = () => {
        const appl = []
        props.patients.map((app) => {
            if (app.status === 'approved')
                appl.push(app)
        })
        const sorted = sortApplications(appl)
        setPatients(sorted)
        // console.log('in populateApproved : ', sorted);
    }

    const populateTodays = () => {
        // console.log('props.patinets : ', props.patients);
        const appl = []
        props.patients.map((app) => {
            if (app.date === today)
                appl.push(app)
        })
        const sorted = sortApplications(appl)
        // console.log('sorted : ', sorted);
        setPatients(sorted)
        // console.log('in populateTodays : ', sorted);
    }

    const renderApplications = () => {
        if (validateString(searchName)) {
            return renderSearchResults()
        }
        // console.log('patints : ', patients);
        return patients.map(patient => {
            if (validateString(doctor) && validateString(day)) {
                if (patient.doctor === doctor && day === calculateDay(patient.date)) {
                    return <ApplicationCard key={patient._id} doctor={patient.doctor} status={patient.status} slot={patient.slot} name={patient.name} phone={patient.phone} patientId={patient._id} date={patient.date} />
                }
            } else if (validateString(doctor) && validateDate(date)) {
                if (patient.doctor === doctor && patient.date === date) {
                    return <ApplicationCard key={patient._id} doctor={patient.doctor} status={patient.status} slot={patient.slot} name={patient.name} phone={patient.phone} patientId={patient._id} date={patient.date} />
                }
            } else if (validateDate(date)) {
                if (patient.date === date) {
                    return <ApplicationCard key={patient._id} doctor={patient.doctor} status={patient.status} slot={patient.slot} name={patient.name} phone={patient.phone} patientId={patient._id} date={patient.date} />
                }
            } else if (validateString(doctor)) {
                if (patient.doctor === doctor) {
                    return <ApplicationCard key={patient._id} doctor={patient.doctor} status={patient.status} slot={patient.slot} name={patient.name} phone={patient.phone} patientId={patient._id} date={patient.date} />
                }
            } else if (validateString(day)) {
                if (day === calculateDay(patient.date)) {
                    return <ApplicationCard key={patient._id} doctor={patient.doctor} status={patient.status} slot={patient.slot} name={patient.name} phone={patient.phone} patientId={patient._id} date={patient.date} />
                }
            } else {
                // console.log('returning undcond');
                return <ApplicationCard key={patient._id} doctor={patient.doctor} status={patient.status} slot={patient.slot} name={patient.name} phone={patient.phone} patientId={patient._id} date={patient.date} />
            }
        })
    }

    const renderSearchResults = () => {
        return props.patients.map(patient => {
            if (patient.name.includes(searchName)) {
                return <ApplicationCard key={patient._id} doctor={patient.doctor} status={patient.status} slot={patient.slot} name={patient.name} phone={patient.phone} patientId={patient._id} date={patient.date} />
            }
        })
    }

    const doctorChangeHandler = (event) => {
        setDoctor(event.target.value)
        setSearchName('')
    }

    const dateChangeHandler = (event) => {
        setDate(event.target.value)
        setDay('')
        setSearchName('')
    }
    const dayChangeHandler = (event) => {
        setDay(event.target.value)
        setDate('')
        setSearchName('')
    }

    const searchChangeHandler = (event) => {
        setSearchName(event.target.value)
        setDay('')
        setDate('')
        setDoctor('')
        // console.log('search is for : ', searchName);
    }

    return (
        <section id='applications-container'>
            <SearchSection
                searchChangeHandler={searchChangeHandler}
                searchName={searchName}
            />
            <SortingComponent
                dateChangeHandler={dateChangeHandler}
                doctorChangeHandler={doctorChangeHandler}
                dayChangeHandler={dayChangeHandler}
            />
            <div className='applications-wrapper'>
                {renderApplications()}
            </div>
        </section >
    );
}

export default App;