const { Schema, model } = require('mongoose');

const prescriptionSchema = new Schema({
    appointmentId: {
        type: Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
    patientId: {
        type: String, // Using string to match with userEmail from appointments
        required: true
    },
    doctorId: {
        type: String,
        required: true
    },
    patientName: {
        type: String,
        required: true,
        maxlength: 100
    },
    doctorName: {
        type: String,
        required: true,
        maxlength: 100
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    symptoms: {
        type: String,
        required: true,
        maxlength: 1000
    },
    diagnosis: {
        type: String,
        required: true,
        maxlength: 1000
    },
    medications: [{
        name: {
            type: String,
            required: true,
            maxlength: 200
        },
        dosage: {
            type: String,
            required: true,
            maxlength: 100
        },
        frequency: {
            type: String,
            required: true,
            maxlength: 100
        },
        duration: {
            type: String,
            required: true,
            maxlength: 100
        },
        instructions: {
            type: String,
            maxlength: 200
        }
    }],
    advice: {
        type: String,
        maxlength: 1000
    },
    followUpDate: {
        type: String, // Optional follow-up date
        maxlength: 50
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for faster queries
prescriptionSchema.index({ appointmentId: 1 });
prescriptionSchema.index({ patientId: 1 });
prescriptionSchema.index({ doctorId: 1 });
prescriptionSchema.index({ date: -1 });

const PrescriptionModel = model('Prescription', prescriptionSchema);

module.exports = PrescriptionModel;
