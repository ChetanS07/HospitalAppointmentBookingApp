const { doctorSchema, Doctor } = require('../models/doctorModel')
const { appointmentSchema, Appointment } = require('../models/appointmentModel')
const { patientSchema, Patient } = require('../models/patientModel')

const bookAppointment = async (req, res) => {

    //handle validation error
    //user Doctor.create()

    const { date, doctor: doctorName, name, phone, slot } = req.body

    const newPatient = new Patient({
        name: name,
        phone: phone,
        slot: slot,
        date: date,
        doctor: doctorName
    })

    try {
        const doctor = await Doctor.findOne({ name: doctorName }).exec()
        const patient = await newPatient.save()

        console.log('Saved patient detail : ', patient);

        const index = doctor.appointments.findIndex((app) => app.date === date)
        if (index === -1) {
            //no matching found
            const newAppointment = new Appointment({
                date: date,
                slots: {
                    [slot]: [{ status: 'pending', patientId: patient._id }]
                }
            })
            doctor.appointments.push(newAppointment)
        } else {
            //matching found
            doctor.appointments[index].slots[slot].push({ status: 'pending', patientId: patient._id })
        }

        doctor.save()
        console.log('booked appointment successfully : ', doctor.appointments);
        res.send({ status: 'success' })
    } catch (err) {
        console.log('Failed to book appointment ', err);
        res.send({ status: 'failure' })
    }
}

const getSlots = async (req, res) => {
    // const date = req.body.date
    // const doctorName = req.body.doctor
    const { date, doctor: doctorName } = req.body

    let slotsAvailable = {}

    try {
        const doctor = await Doctor.findOne({ name: doctorName }).exec()
        const appointments = doctor.appointments

        if (appointments.length === 0) {
            // no appointments for that date and all slots are free
            slotsAvailable = {}
        } else {
            // appointments are there but not sure about which date
            const index = appointments.findIndex((app) => app.date === date)

            if (index === -1) {
                // no appointments for that date
                slotsAvailable = {}
            } else {
                //appointments exist on that day
                slotsAvailable = appointments[index].slots
            }
        }
        console.log(slotsAvailable);
        res.send({ status: 'success', slots: slotsAvailable })
    } catch (err) {
        console.log('Failed to get Slots : ', err);
        res.send({ status: 'failure', slots: slotsAvailable })
    }

}

const getAppointments = async (req, res) => {
    if (req.isAuth) {
        try {
            const patients = await Patient.find({})
            res.send({ status: 'success', patients: patients })
        } catch (error) {
            console.log('Failed to get Appointments : ', error);
            res.send({ status: 'failure', patients: [] })
        }
    } else {
        console.log('User Authorization failed');
        res.send({ status: 'failure', patients: [] })
    }
}

const approveAppointment = async (req, res) => {
    const patientId = req.body.patientId
    let status = 'failure'

    if (req.isAuth) {
        try {
            const newPatient = await Patient.findById(patientId).exec()
            const doctorName = newPatient.doctor
            const date = newPatient.date
            const slot = newPatient.slot

            const doctor = await Doctor.findOne({ name: doctorName })
            const index = doctor.appointments.findIndex((app) => app.date === date)
            if (index === -1) {
                console.log('Failed to approve appointment, document not found');
                status = 'failure'
            } else {
                doctor.appointments[index].slots[slot].map(patient => {
                    if (patient.patientId.toString() === patientId && patient.status === 'pending') {
                        patient.status = 'approved'
                        // newPatient.status === 'approved'
                    }
                })
                //update the patientModel aswell
                const doc = await Patient.findOneAndUpdate({ _id: patientId }, { status: 'approved' }, {
                    new: true
                });

                doctor.markModified('appointments');
                doctor.save().then(saved => {
                    console.log('Approved the Appointment');
                })
                status = 'success'
            }
            res.send({ status: status })
        } catch (err) {
            status = 'failure'
            console.log('Failed to approve appointment : ', err);
            res.send({ status: status })
        }
    } else {
        console.log('User Authorization failed');
        res.send({ status: 'failure' })
    }
}

const deleteAppointment = async (req, res) => {
    const patientId = req.body.patientId
    let status = 'failure'

    if (req.isAuth) {
        try {
            const newPatient = await Patient.findById(patientId)
            const doctorName = newPatient.doctor
            const date = newPatient.date
            const slot = newPatient.slot

            const doctor = await Doctor.findOne({ name: doctorName }).exec()

            const appIndex = doctor.appointments.findIndex(app => app.date === date)
            const patIndex = doctor.appointments[appIndex].slots[slot].findIndex(patient => patient.patientId.toString() === patientId)
            if (appIndex !== -1 && patIndex !== -1)
                doctor.appointments[appIndex].slots[slot].splice(patIndex, 1)
            else
                console.log('Document not found');

            doctor.markModified('appointments');
            doctor.save().then(saved => {
                console.log('Saved the Doctor Model Succesfully');
            })
            status = 'success'
            const deleted = await Patient.findOneAndDelete({ _id: patientId })
            console.log('Deleted patient appointment : ', deleted);
            res.send({ status: status })
        } catch (err) {
            status = 'failure'
            console.log('Failed to delete appointment : ', err);
            res.send({ status: status })
        }
    } else {
        console.log('User Authorization failed');
        res.send({ status: 'failure' })
    }
}

const addDoctor = async (req, res) => {
    const doctorName = req.body.doctor

    const newDoctor = new Doctor({
        name: doctorName
    })

    try {
        const doctor = await newDoctor.save()
        console.log('Added doctor succesfully : ', doctor);
        res.send({ status: 'success' })
    } catch (err) {
        console.log('Error while adding doctor ', err);
        res.send({ status: 'failure' })
    }
}

module.exports = {
    bookAppointment: bookAppointment,
    getSlots: getSlots,
    getAppointments: getAppointments,
    approveAppointment: approveAppointment,
    deleteAppointment: deleteAppointment,
    addDoctor: addDoctor
}