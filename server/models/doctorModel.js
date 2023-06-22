const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { appointmentSchema } = require('./appointmentModel')

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    appointments: {
        type: [appointmentSchema],
        default: []
    }
})

const Doctor = new mongoose.model('doctor', doctorSchema)

module.exports = {
    doctorSchema: doctorSchema,
    Doctor: Doctor
}