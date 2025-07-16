const Appointment = require('../models/AppointmentModel');

//business logic 
//create appointment    

const createAppointments = async (req, res) => {
    try {
        const { doctorId, patientName, userEmail, problemDescription, appointmentDate, appointmentTime } = req.body;

        const newAppointment = new Appointment({
            doctorId,
            patientName,
            userEmail,
            problemDescription,
            appointmentDate,
            appointmentTime
        });

        await newAppointment.save();

        res.status(200).json({
            success: true,
            data: newAppointment
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

//get appointments 

const getAppointments = async (req, res) => {
    try {
        const {email} = req.query;
        let appointments;
        
        if(email){
            appointments = await Appointment.find({userEmail: email});

        }else{
            appointments = await Appointment.find();
        }

        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found' });
        }

        //if we have products
        res.status(200).json({
            success: true,
            data: appointments
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

}

//const update appointments


const updateAppointments = async (req, res) => {
    try {
        const { id } = req.params;
        const { doctorId, patientName, userEmail, problemDescription, appointmentDate, appointmentTime } = req.body;

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id,
            {
                doctorId,
                patientName,
                userEmail,
                problemDescription,
                appointmentDate,
                appointmentTime
            },
            { new: true }
        );
        if (!updatedAppointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }
        
        res.status(200).json({
            success: true,
            data: updatedAppointment
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// delete appointments

const deleteAppointments = async (req, res) => {
    try {
        const { id } = req.params;

       const deletdAppointment = await Appointment.findByIdAndDelete(id);

        if(!deletdAppointment){
            res.json({
                message: 'Appointment not found',
            })
        }

        res.status(200).json({
            success: true,
            message: 'Appointment deleted'
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}



module.exports = { getAppointments ,updateAppointments,createAppointments,deleteAppointments}; 