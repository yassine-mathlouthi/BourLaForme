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
    enum: ["accepted"],
    default: 'accepted',
    required: true
    
  },
});


// Indexation
reservationCourseSchema.index({ userId: 1, courseId: 1 }); // Pour vérifier les doublons
reservationCourseSchema.index({ userId: 1, createdAt: -1 }); // Pour filtre et tri par utilisateur

module.exports = mongoose.model("ReservationCourse", reservationCourseSchema);
