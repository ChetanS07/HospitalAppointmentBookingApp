import React, { useState, useReducer } from 'react';
import axios from 'axios'

//css
import './index.css'

//components
import { SlotContextProvider } from '../../../../store/slotContext';
import SlotForm from './components/slotForm'
import RequestForm from './components/requestForm'
import AddressSection from './components/AddressComponent'

const day = new Date();
day.setDate(day.getDate() + 1);
const currentDate = day.toISOString().split('T')[0]

function App() {

    return (
        <SlotContextProvider>
            <div id='form-contact-section'>
                <AddressSection />
                <section id='form-section'>
                    <h2 className='book-app-heading'>Book Your Appointment</h2>
                    <SlotForm currentDate={currentDate} />
                    <RequestForm />
                </section >
            </div>
        </SlotContextProvider>
    );
}

export default App;