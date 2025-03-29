const cron = require('node-cron');
const { checkExpiringSubscriptions } = require('./subscriptionService');

// Planifier la tâche tous les jours à 9h du matin
cron.schedule('0 9 * * *', () => {
  console.log("Vérification des abonnements expirés...");
  checkExpiringSubscriptions();
});