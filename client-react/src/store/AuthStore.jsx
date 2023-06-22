import React from 'react';
import { createStore } from 'redux'

const authReducer = (state = { isAuth: false, user: 'User 1' }, action) => {
    if (action.type === 'LOGIN') {
        return {
            user: action.user,
            isAuth: true
        }
    }
    if (action.type === 'LOGOUT') {
        return {
            ...state,
            isAuth: false
        }
    }
    if (action.type === 'UNAUTHORIZED') {
        return {
            ...state,
            isAuth: false
        }
    }

    return state
}

const store = createStore(authReducer)

export default store