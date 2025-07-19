const express = require('express');
const router = express.Router();
const { createDoctor, getDoctors, getDoctorById, updateDoctor, deleteDoctor } = require('../controllers/doctorsController');

// Create doctor
router.post('/doctors', createDoctor);

// Get all doctors
router.get('/doctors', getDoctors);

// Get single doctor
router.get('/doctors/:id', getDoctorById);

// Update doctor
router.put('/doctors/:id', updateDoctor);

// Delete doctor
router.delete('/doctors/:id', deleteDoctor);

module.exports = router;
