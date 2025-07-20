const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function(email) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: 'Please enter a valid email address'
    }
  },
  specialization: {
    type: String,
    required: true
  },
  availableSlots: {
    type: [String], // Array of time slots like ["10:00 AM", "11:00 AM"]
    default: []
  },
  experience: {
    type: String, // You can use Number too, but keeping as string since you wrote it that way
    required: true
  },
  rating: {
    type: Number,
    default: 5,
    min: 0,
    max: 5
  },
  image: {
    type: String, // URL to image
    default: ''   // Optional field
  },
  bio: {
    type: String,
    required: true,
    maxlength: 500
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Doctor', doctorSchema);
