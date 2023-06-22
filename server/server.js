const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')
require('dotenv').config()
require('./config/dbConnection')

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: '*', optionsSuccessStatus: 200

}))
app.use('/', require('./routers/routes.js'))

app.listen(PORT, (err) => {
    if (err) {
        console.log('Falied to Start Server ', err);
    } else {
        console.log('Server Running on port : ', PORT);
    }
})