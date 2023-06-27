import axios from "axios"

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:8000/',
    baseURL: 'https://hospital-booking.onrender.com/',
    headers: { 'content-type': 'application/json' }
})

export default axiosInstance
