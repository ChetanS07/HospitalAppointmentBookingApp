import React from 'react';
import { createStore } from 'redux'


const authReducer = (state = { isAuth: false, user: 'User 1', inAdmin: false }, action) => {
    if (action.type === 'LOGIN') {
        return {
            user: action.user,
            isAuth: true,
            inAdmin: true,
        }
    }
    if (action.type === 'LOGOUT') {
        return {
            ...state,
            isAuth: false,
            inAdmin: false,
        }
    }
    if (action.type === 'UNAUTHORIZED') {
        return {
            ...state,
            isAuth: false,
            inAdmin: false,
        }
    }
    if (action.type === 'IN_ADMIN_PAGE') {
        return {
            user: action.user,
            isAuth: true,
            inAdmin: true,
        }
    }

    return state
}

const store = createStore(authReducer)

export default store