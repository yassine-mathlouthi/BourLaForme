const cron = require('node-cron');
const checkSubscriptions = require('./subscriptionService');

const startCronJob = () => {
  // Exécution immédiate au démarrage
  console.log('Vérification initiale des abonnements au démarrage...');
  checkSubscriptions();

  // Planification quotidienne à minuit
  cron.schedule('0 0 * * *', async () => {
    console.log('Vérification des abonnements à minuit...');
    await checkSubscriptions();
  });
};

module.exports = startCronJob;