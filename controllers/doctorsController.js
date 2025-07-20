const Doctor = require('../models/DoctorsModel');

// CREATE a new doctor
const createDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      specialization,
      availableSlots,
      experience,
      rating,
      image,
      bio
    } = req.body;

    // Validation
    if (!name || !email || !specialization || !experience || !bio) {
      return res.status(400).json({
        success: false,
        message: 'Required fields missing: name, email, specialization, experience, and bio are required'
      });
    }

    // Validate name length
    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Name must be between 2 and 100 characters'
      });
    }

    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    // Validate experience format
    const experienceRegex = /^\d+\s+years?$/i;
    if (!experienceRegex.test(experience)) {
      return res.status(400).json({
        success: false,
        message: 'Experience must be in format "X years" (e.g., "15 years")'
      });
    }

    // Validate bio length
    if (bio.length < 10 || bio.length > 500) {
      return res.status(400).json({
        success: false,
        message: 'Bio must be between 10 and 500 characters'
      });
    }

    // Validate availableSlots
    if (!availableSlots || !Array.isArray(availableSlots) || availableSlots.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one time slot is required'
      });
    }

    // Validate rating if provided
    if (rating !== undefined && (rating < 0 || rating > 5)) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 0 and 5'
      });
    }

    // Check if doctor with same email already exists
    const existingDoctorByEmail = await Doctor.findOne({
      email: email.toLowerCase().trim()
    });

    if (existingDoctorByEmail) {
      return res.status(409).json({
        success: false,
        message: 'A doctor with this email address already exists'
      });
    }

    // Check if doctor with same name and specialization already exists
    const existingDoctor = await Doctor.findOne({
      name: name.trim(),
      specialization: specialization.trim()
    });

    if (existingDoctor) {
      return res.status(409).json({
        success: false,
        message: 'A doctor with this name and specialization already exists'
      });
    }

    const newDoctor = new Doctor({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      specialization: specialization.trim(),
      availableSlots,
      experience: experience.trim(),
      rating: rating || 5.0,
      image: image?.trim() || '',
      bio: bio.trim()
    });

    const savedDoctor = await newDoctor.save();

    res.status(201).json({
      success: true,
      message: 'Doctor registered successfully',
      data: savedDoctor
    });

  } catch (err) {
    console.error('Error creating doctor:', err);

    // Handle mongoose validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    // Handle duplicate key errors
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Doctor with this information already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
};

// READ all doctors
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();

    if (!doctors || doctors.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No doctors found'
      });
    }

    res.status(200).json({
      success: true,
      data: doctors
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// READ single doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: doctor
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// UPDATE doctor
const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: updatedDoctor
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// DELETE doctor
const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDoctor = await Doctor.findByIdAndDelete(id);

    if (!deletedDoctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Doctor deleted',
      data: deletedDoctor
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
};
