const express = require('express')
const { getAppointments, updateAppointments, createAppointments, deleteAppointments } = require('../controllers/appointmentController')
const router = express.Router()


router.get('/appointments',getAppointments);

router.post('/appointments',createAppointments);

router.put('/appointments/:id',updateAppointments);

router.delete('/appointments/:id',deleteAppointments);






module.exports = router