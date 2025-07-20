const express = require('express');
const router = express.Router();
const {
    createPrescription,
    getPrescriptionsByPatient,
    getPrescriptionsByDoctor,
    getPrescriptionById,
    updatePrescription,
    deletePrescription
} = require('../controllers/prescriptionController');

// Create prescription
router.post('/prescriptions', createPrescription);

// Get prescriptions by patient ID
router.get('/prescriptions/patient/:patientId', getPrescriptionsByPatient);

// Get prescriptions by doctor ID
router.get('/prescriptions/doctor/:doctorId', getPrescriptionsByDoctor);

// Get single prescription by ID
router.get('/prescriptions/:id', getPrescriptionById);

// Update prescription
router.put('/prescriptions/:id', updatePrescription);

// Delete prescription
router.delete('/prescriptions/:id', deletePrescription);

module.exports = router;
