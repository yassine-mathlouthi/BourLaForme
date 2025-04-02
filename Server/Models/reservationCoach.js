// models/Reservation.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const reservationSchema = new Schema({
  adherent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: { 
    type: String,
    required: true,
    match: [/^\d{2}:\d{2}$/, 'Le format de l\'heure doit être HH:mm']
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

// Indexation
reservationSchema.index({ coach: 1, status: 1, date: 1 }); // Index composé pour filtre et tri
reservationSchema.index({ adherent: 1 });                  // Pour filtres par adhérent

module.exports = mongoose.model("Reservation", reservationSchema);