const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true }, // Durée en minutes
  availableSeats: { type: Number, required: true },
  coachName: { type: String, required: true },
  schedule: { type: Date, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true } // URL de l'image
});


module.exports = mongoose.model('Course', courseSchema);