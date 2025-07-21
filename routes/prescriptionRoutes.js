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
const verifyToken = require('../middlewares/verifytoken.middleware');
const verifyAdmin = require('../middlewares/verifyAdmin.middleware');

// Create prescription
router.post('/prescriptions',verifyToken,verifyAdmin, createPrescription);

// Get prescriptions by patient ID
router.get('/prescriptions/patient/:patientId',verifyToken, getPrescriptionsByPatient);

// Get prescriptions by doctor ID
router.get('/prescriptions/doctor/:doctorId', getPrescriptionsByDoctor);

// Get single prescription by ID
router.get('/prescriptions/:id',verifyToken, getPrescriptionById);

// Update prescription
router.put('/prescriptions/:id', verifyToken,verifyAdmin,updatePrescription);

// Delete prescription
router.delete('/prescriptions/:id', verifyToken,verifyAdmin,deletePrescription);

module.exports = router;
