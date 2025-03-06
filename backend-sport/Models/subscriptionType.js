const mongoose = require('mongoose');

const subscriptionTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Par exemple, "Mensuel", "Annuel", etc.
  duration: { type: Number, required: true },  // Durée en mois
  price: { type: Number, required: true },  // Prix de l'abonnement
  description: { type: String },  // Description 
});

module.exports = mongoose.model('SubscriptionType', subscriptionTypeSchema);
