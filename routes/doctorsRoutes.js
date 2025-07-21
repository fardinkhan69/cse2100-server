const express = require('express');
const router = express.Router();
const { createDoctor, getDoctors, getDoctorById, updateDoctor, deleteDoctor, checkAdminStatus } = require('../controllers/doctorsController');
const verifyToken = require('../middlewares/verifytoken.middleware');
const verifyAdmin = require('../middlewares/verifyAdmin.middleware');

// Create doctor
router.post('/doctors', createDoctor);

// Get all doctors
router.get('/doctors', getDoctors);

// Check admin status (if user is a doctor)
router.get('/doctors/admin/:email', verifyToken, checkAdminStatus);

// Get single doctor
router.get('/doctors/:id', getDoctorById);

// Update doctor
router.put('/doctors/:id',verifyToken,verifyAdmin, updateDoctor);

// Delete doctor
router.delete('/doctors/:id', verifyToken,verifyAdmin,deleteDoctor);

module.exports = router;
