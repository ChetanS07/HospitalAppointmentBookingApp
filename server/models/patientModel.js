const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const patientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    slot: {
        type: String,
        required: true
    },
    doctor: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    }
})

const Patient = new mongoose.model('patient', patientSchema)

module.exports = {
    patientSchema: patientSchema,
    Patient: Patient
}