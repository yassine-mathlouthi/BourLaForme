const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['abonnement_expire'],
    required: true,
  },
  isReadAdherent: {
    type: Boolean,
    default: false,
  },
  isReadAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexation
notificationSchema.index({ type: 1, createdAt: -1 }); // Pour filtre et tri
notificationSchema.index({ user: 1, createdAt: -1 }); // Pour filtre par utilisateur et tri par date

module.exports = mongoose.model('Notification', notificationSchema);
