const Prescription = require('../models/PrescriptionModel');
const Appointment = require('../models/AppointmentModel');

// CREATE prescription
const createPrescription = async (req, res) => {
    try {
        const {
            appointmentId,
            patientId,
            doctorId,
            patientName,
            doctorName,
            symptoms,
            diagnosis,
            medications,
            advice,
            followUpDate
        } = req.body;

        // Validation
        if (!appointmentId || !patientId || !doctorId || !patientName || !doctorName || !symptoms || !diagnosis) {
            return res.status(400).json({
                success: false,
                message: 'Required fields missing: appointmentId, patientId, doctorId, patientName, doctorName, symptoms, and diagnosis are required'
            });
        }

        // Validate medications array
        if (!medications || !Array.isArray(medications) || medications.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'At least one medication is required'
            });
        }

        // Validate each medication
        for (const med of medications) {
            if (!med.name || !med.dosage || !med.frequency || !med.duration) {
                return res.status(400).json({
                    success: false,
                    message: 'Each medication must have name, dosage, frequency, and duration'
                });
            }
        }

        // Check if appointment exists
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        // Check if prescription already exists for this appointment
        const existingPrescription = await Prescription.findOne({ appointmentId });
        if (existingPrescription) {
            return res.status(409).json({
                success: false,
                message: 'Prescription already exists for this appointment'
            });
        }

        // Create new prescription
        const newPrescription = new Prescription({
            appointmentId,
            patientId,
            doctorId,
            patientName: patientName.trim(),
            doctorName: doctorName.trim(),
            symptoms: symptoms.trim(),
            diagnosis: diagnosis.trim(),
            medications,
            advice: advice?.trim() || '',
            followUpDate: followUpDate?.trim() || ''
        });

        await newPrescription.save();

        res.status(201).json({
            success: true,
            message: 'Prescription created successfully',
            data: newPrescription
        });

    } catch (err) {
        console.error('Error creating prescription:', err);
        res.status(500).json({
            success: false,
            message: err.message || 'Internal server error'
        });
    }
};

// GET prescriptions by patient ID
const getPrescriptionsByPatient = async (req, res) => {
    try {
        const { patientId } = req.params;

        if (!patientId) {
            return res.status(400).json({
                success: false,
                message: 'Patient ID is required'
            });
        }

        const prescriptions = await Prescription.find({ patientId })
            .populate('appointmentId')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: prescriptions
        });

    } catch (err) {
        console.error('Error fetching prescriptions:', err);
        res.status(500).json({
            success: false,
            message: err.message || 'Internal server error'
        });
    }
};

// GET prescriptions by doctor ID
const getPrescriptionsByDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;

        if (!doctorId) {
            return res.status(400).json({
                success: false,
                message: 'Doctor ID is required'
            });
        }

        const prescriptions = await Prescription.find({ doctorId })
            .populate('appointmentId')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: prescriptions
        });

    } catch (err) {
        console.error('Error fetching prescriptions:', err);
        res.status(500).json({
            success: false,
            message: err.message || 'Internal server error'
        });
    }
};

// GET single prescription by ID
const getPrescriptionById = async (req, res) => {
    try {
        const { id } = req.params;

        const prescription = await Prescription.findById(id)
            .populate('appointmentId');

        if (!prescription) {
            return res.status(404).json({
                success: false,
                message: 'Prescription not found'
            });
        }

        res.status(200).json({
            success: true,
            data: prescription
        });

    } catch (err) {
        console.error('Error fetching prescription:', err);
        res.status(500).json({
            success: false,
            message: err.message || 'Internal server error'
        });
    }
};

// UPDATE prescription
const updatePrescription = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Remove undefined fields
        Object.keys(updateData).forEach(key => {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        });

        // Add updatedAt timestamp
        updateData.updatedAt = new Date();

        const updatedPrescription = await Prescription.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedPrescription) {
            return res.status(404).json({
                success: false,
                message: 'Prescription not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Prescription updated successfully',
            data: updatedPrescription
        });

    } catch (err) {
        console.error('Error updating prescription:', err);
        res.status(500).json({
            success: false,
            message: err.message || 'Internal server error'
        });
    }
};

// DELETE prescription
const deletePrescription = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPrescription = await Prescription.findByIdAndDelete(id);

        if (!deletedPrescription) {
            return res.status(404).json({
                success: false,
                message: 'Prescription not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Prescription deleted successfully'
        });

    } catch (err) {
        console.error('Error deleting prescription:', err);
        res.status(500).json({
            success: false,
            message: err.message || 'Internal server error'
        });
    }
};

module.exports = {
    createPrescription,
    getPrescriptionsByPatient,
    getPrescriptionsByDoctor,
    getPrescriptionById,
    updatePrescription,
    deletePrescription
};
