import React, { useState, useReducer } from 'react';
import axios from 'axios'

//css
import './index.css'

//components
import { SlotContextProvider } from '../../../../store/slotContext';
import SlotForm from './components/slotForm'
import RequestForm from './components/requestForm'

const day = new Date();
day.setDate(day.getDate() + 1);
const currentDate = day.toISOString().split('T')[0]

function App() {

    return (
        <SlotContextProvider>
            <section id='form-section'>
                <SlotForm currentDate={currentDate} />
                <RequestForm />
            </section >
        </SlotContextProvider>
    );
}

export default App;