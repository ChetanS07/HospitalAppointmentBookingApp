import { today } from '../config/data'

export const validateDate = (date) => {
    return !(isNaN((new Date(date)).getDate()) && isNaN((new Date(date)).getMonth()) && isNaN((new Date(date)).getFullYear()))
}

export const validateString = (str) => {
    if (str)
        return true
    else
        return false
}

export const validatePhone = (phone) => {
    return (phone.toString().trim().length === 10)
}

export const validateObject = (object) => {
    return Object.keys(object).length > 0 ? true : false
}

export const calculateDay = (date) => {
    if (validateDate(date)) {
        const dateRecieved = new Date(date)
        const currentDate = new Date(today)
        switch (true) {
            case dateRecieved > currentDate:
                return 'future'
                break;
            case dateRecieved < currentDate:
                return 'past'
                break;
            case date === today:
                return 'today'
                break;
            default:
                return undefined
                break;
        }
    }
}