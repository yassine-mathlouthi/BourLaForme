const mongoose = require("mongoose");

const reservationCourseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "confirmed",
  },
});

module.exports = mongoose.model("Reservation", reservationSchema);
