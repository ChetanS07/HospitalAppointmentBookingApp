const mongoose = require('mongoose')
const { Schema } = require('mongoose')

// const { slotSchema } = require('./slotModel')

const appointmentSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    slots: {
        slot1: {
            type: [],
            default: [],
            validate: {
                validator: function (array) {
                    return array.length <= 5;
                },
                message: 'myArray must contain 5 or fewer elements'
            }
        },
        slot2: {
            type: [],
            default: [],
            validate: {
                validator: function (array) {
                    return array.length <= 5;
                },
                message: 'myArray must contain 5 or fewer elements'
            }
        },
        slot3: {
            type: [],
            default: [],
            validate: {
                validator: function (array) {
                    return array.length <= 5;
                },
                message: 'myArray must contain 5 or fewer elements'
            }
        },
        slot4: {
            type: [],
            default: [],
            validate: {
                validator: function (array) {
                    return array.length <= 5;
                },
                message: 'myArray must contain 5 or fewer elements'
            },
        },
    }
})

const Appointment = mongoose.model('appointment', appointmentSchema)

module.exports = {
    appointmentSchema: appointmentSchema,
    Appointment: Appointment
}