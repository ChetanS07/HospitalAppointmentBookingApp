const express = require('express')
const app = express()

const { bookAppointment, getSlots, getAppointments, approveAppointment, deleteAppointment, addDoctor } = require('../controllers/dbController')
const { addUser, login, logout } = require('../controllers/userController')
const { authorizeUser } = require('../middlewares/auth')

app.get('/', (req, res) => {
    res.send('hello there')
})

//dbRoutes
app.get('/db/getAppointments', authorizeUser, getAppointments)
app.post('/db/bookAppointment', bookAppointment)
app.post('/db/getSlots', getSlots)
app.post('/db/approveAppointment', authorizeUser, approveAppointment)
app.post('/db/deleteAppointment', authorizeUser, deleteAppointment)
app.post('/db/addDoctor', authorizeUser, addDoctor)

//userRoutes
app.post('/usr/register', addUser)
app.post('/usr/login', login)
app.get('/usr/logout', logout)

module.exports = app