const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'SubscriptionType', required: true },  // Référence au type d'abonnement
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // L'adhérent lié
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
 