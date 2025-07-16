const { Schema, model } = require('mongoose');

const applicationSchema = new Schema({
    doctorId: {
        type: String,
        required: true
    },
    patientName: {
        type: String,
        required: true,
        maxlength: 50
    },
    userEmail: {
        type: String,
        required: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },

    problemDescription: {
        type: String,
        required: true,
    },
    appointmentDate: {
        type: String,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    },
    booking: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const AppointmentModel = model('Appointment', applicationSchema);




module.exports = AppointmentModel;