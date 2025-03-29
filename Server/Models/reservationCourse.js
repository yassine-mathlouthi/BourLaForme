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
  status: {
    type: String,
    enum: ["accepted", "rejected"],
    
  },
});

module.exports = mongoose.model("ReservationCourse", reservationCourseSchema);
