import React from 'react';
import jwt from 'react-jwt'

export const getToken = () => {
    const token = localStorage.getItem('userToken')
    if (token) {
        return token
    } else {
        return null
    }
}

export const deleteToken = () => {
    const token = getToken()
    if (token) {
        localStorage.removeItem("userToken")
        return true
    } else {
        return false
    }
}

export const setToken = (token) => {
    localStorage.setItem('userToken', token)
}