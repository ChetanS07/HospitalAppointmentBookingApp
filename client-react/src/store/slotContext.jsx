import React, { createContext, useState } from 'react';

const day = new Date();
day.setDate(day.getDate() + 1);
const currentDate = day.toISOString().split('T')[0]

const SlotContext = createContext();

const SlotContextProvider = ({ children }) => {
    const [date, setDate] = useState(currentDate)
    const [doctor, setDoctor] = useState('')
    const [slots, setSlots] = useState({})
    const [slotsAvailable, setSlotsAvailable] = useState(false)

    const contextValue = {
        date, doctor, slots, slotsAvailable, setDate, setDoctor, setSlots, setSlotsAvailable
    };

    return (
        <SlotContext.Provider value={contextValue}>
            {children}
        </SlotContext.Provider>
    );
};

export { SlotContext, SlotContextProvider };