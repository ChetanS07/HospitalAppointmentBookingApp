import React, { useRef } from 'react';

//css
import './SideMenu.css'
import '../../../main.css'

//components
import UserCard from '../components/UserCard'
import Button from '../components/SideMenuButton'

function App(props) {

    return (
        <section id='side-menu' className='flexbox'>
            <UserCard />
            <div className='application-selector flexbox '>
                <button
                    className='application-btn btn-active'
                    onClick={props.showToday}
                    ref={props.todayButton}
                >
                    Todays Applications
                </button>
                <button
                    className='application-btn'
                    onClick={props.showPending}
                    ref={props.pendingButton}
                >
                    Pending Applications
                </button>
                <button
                    className='application-btn'
                    onClick={props.showApproved}
                    ref={props.approveButton}
                >
                    Approved Applications
                </button>

            </div>
        </section>
    );
}

export default App;