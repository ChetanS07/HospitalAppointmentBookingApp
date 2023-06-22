import React, { useReducer, useState } from 'react'

//modules
import { validateDate, validatePhone, validateString } from './validaters';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const currentDate = tomorrow.toISOString().split('T')[0]

export const dateReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: validateDate(action.val) }
    }
    if (action.type === 'INPUT_BLUR') {
        return {
            ...state, ...{ isValid: validateDate(state.value) }
        }
    }
    if (action.type === 'RESTORE')
        return { ...state }
    return { value: currentDate, isValid: validateDate(currentDate) }
}

export const doctorReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: validateString(action.val) }
    }
    if (action.type === 'INPUT_BLUR') {
        return {
            ...state, ...{ isValid: validateString(state.value) }
        }
    }
    return { value: '', isValid: false }
}

export const nameReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: validateString(action.val) }
    }
    if (action.type === 'INPUT_BLUR') {
        return {
            ...state, ...{ isValid: validateString(state.value) }
        }
    }
    return { value: '', isValid: false }
}

export const phoneReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: validatePhone(action.val) }
    }
    if (action.type === 'INPUT_BLUR') {
        return {
            ...state, ...{ isValid: validatePhone(state.value) }
        }
    }
    return { value: '', isValid: false }
}

export const slotReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: validateString(action.val) }
    }
    if (action.type === 'INPUT_BLUR') {
        return {
            ...state, ...{ isValid: validateString(state.value) }
        }
    }
    return { value: '', isValid: false }
}

export const reasonReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: validateString(action.val) }
    }
    if (action.type === 'INPUT_BLUR') {
        return {
            ...state, ...{ isValid: validateString(state.value) }
        }
    }
    return { value: '', isValid: false }
}

// export const validateDate = (date) => {
//     return !(isNaN((new Date(date)).getDate()) && isNaN((new Date(date)).getMonth()) && isNaN((new Date(date)).getFullYear()))
// }

// export const validateString = (str) => {
//     if (str)
//         return true
//     else
//         return false
// }

// export const validatePhone = (phone) => {
//     return (phone.trim().length === 10)
// }


// module.exports = {
//     dateReducer: dateReducer,
//     doctorReducer: doctorReducer,
//     nameReducer: nameReducer,
//     slotReducer: slotReducer,
//     phoneReducer: phoneReducer,
//     reasonReducer: reasonReducer,
//     validateDate: validateDate,
//     validatePhone: validatePhone,
//     validateString: validateString
// }