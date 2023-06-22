import { doctors, slots } from '../config/data'

export const renderDoctors = () => {
    return Object.keys(doctors).map(doctor => {
        return <option value={doctor} key={doctor}>{doctors[doctor]}</option>
    })
}