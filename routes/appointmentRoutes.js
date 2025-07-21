const express = require('express')
const { getAppointments, updateAppointments, createAppointments, deleteAppointments } = require('../controllers/appointmentController');
const verifyToken = require('../middlewares/verifytoken.middleware');
const router = express.Router()


router.get('/appointments',verifyToken,getAppointments);

router.post('/appointments',verifyToken,createAppointments);

router.put('/appointments/:id',verifyToken,updateAppointments);

router.delete('/appointments/:id',verifyToken,deleteAppointments);






module.exports = router