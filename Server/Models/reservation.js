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

module.exports = mongoose.model("Reservation", reservationSchema);