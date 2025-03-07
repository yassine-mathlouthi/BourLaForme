const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schéma pour le Coach Privé
const privateCoachSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // Un seul profil coach privé par utilisateur
  },
  specialty: {
    type: String,
    required: true,
  },

  bio: {
    type: String,
    maxlength: [500, 'La bio est trop longue'],
  },
});

module.exports = mongoose.model('PrivateCoach', privateCoachSchema);
