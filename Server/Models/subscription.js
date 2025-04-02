const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'SubscriptionType', required: true },  // Référence au type d'abonnement
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // L'adhérent lié
  status: {
    type: String,
    enum: ['active', 'expired'],
    required: true,
    default: 'active'  // Default is "active"
  }
});

// Indexation
subscriptionSchema.index({ user: 1 }); // Pour les filtres par utilisateur

module.exports = mongoose.model('Subscription', subscriptionSchema);
 