import React, { useEffect, useRef } from 'react';

//css
import './SideMenu.css'
import '../../../main.css'

//components
import UserCard from '../components/UserCard'

import { today } from '../../../config/data';

function App(props) {

    const todayButton = useRef(null)
    const pendingButton = useRef(null)
    const approveButton = useRef(null)
    const allButton = useRef(null)
    const menuOpenBtn = useRef(null)
    const menuCloseBtn = useRef(null)
    const sideMenu = useRef(null)

    useEffect(() => {
        if (props.show === today) {
            todayButton.current.classList.add('btn-active')
            pendingButton.current.classList.remove('btn-active')
            approveButton.current.classList.remove('btn-active')
            allButton.current.classList.remove('btn-active')
        }
        if (props.show === 'pending') {
            todayButton.current.classList.remove('btn-active')
            pendingButton.current.classList.add('btn-active')
            approveButton.current.classList.remove('btn-active')
            allButton.current.classList.remove('btn-active')
        }
        if (props.show === 'approved') {
            todayButton.current.classList.remove('btn-active')
            pendingButton.current.classList.remove('btn-active')
            approveButton.current.classList.add('btn-active')
            allButton.current.classList.remove('btn-active')
        }
        if (props.show === 'all') {
            todayButton.current.classList.remove('btn-active')
            pendingButton.current.classList.remove('btn-active')
            approveButton.current.classList.remove('btn-active')
            allButton.current.classList.add('btn-active')
        }

    }, [props.show])

    return (
        <section
            ref={sideMenu}
            id='side-menu'
            className='flexbox'
        >
            <button
                ref={menuOpenBtn}
                onClick={(event) => {
                    menuOpenBtn.current.classList.add('menu-open-btn-deactive')
                    menuCloseBtn.current.classList.remove('menu-close-btn-deactive')
                    sideMenu.current.classList.add('side-menu-active')
                }}
                className='menu-open-btn'
            >
                <i className="fa-solid fa-bars fa-xl"></i>
            </button>
            <button
                ref={menuCloseBtn}
                className='menu-close-btn menu-close-btn-deactive'
                onClick={(event) => {
                    menuOpenBtn.current.classList.remove('menu-open-btn-deactive')
                    menuCloseBtn.current.classList.add('menu-close-btn-deactive')
                    sideMenu.current.classList.remove('side-menu-active')
                }}
            >
                <i className="fa-solid fa-xmark fa-xl"></i>
            </button>
            <UserCard />
            <div className='application-selector flexbox '>
                <button
                    className='application-btn'
                    onClick={() => {
                        localStorage.setItem('shows', today)
                        props.showToday()
                    }}
                    ref={todayButton}
                >
                    Todays Applications
                </button>
                <button
                    className='application-btn'
                    onClick={() => {
                        localStorage.setItem('shows', 'pending')
                        props.showPending()

                    }}
                    ref={pendingButton}
                >
                    Pending Applications
                </button>
                <button
                    className='application-btn'
                    onClick={() => {
                        localStorage.setItem('shows', 'approved')
                        props.showApproved()
                    }}
                    ref={approveButton}
                >
                    Approved Applications
                </button>

                <button
                    className='application-btn'
                    onClick={() => {
                        localStorage.setItem('shows', 'all')
                        props.showAll()
                    }}
                    ref={allButton}
                >
                    All Applications
                </button>
            </div>
        </section>
    );
}

export default App;