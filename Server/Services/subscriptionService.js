const Subscription = require('../../Models/Subscription');
const { sendEmail } = require('./emailService');  // Service d'envoi d'email


const checkExpiringSubscriptions = async () => {
  try {
    const today = new Date();
    
    // Trouver les abonnements qui expirent dans 3 jours ou déjà expirés
    const subscriptions = await Subscription.find({
      $or: [
        { endDate: { $lte: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000) }, status: 'active' },  // 3 jours avant expiration
        { endDate: { $lt: today }, status: 'active' }  // Déjà expiré
      ]
    })
    .populate('user');  // Peupler les informations de l'adhérent
    
    subscriptions.forEach(async (subscription) => {
      const user = subscription.user;
      const endDate = subscription.endDate.toISOString().split('T')[0];
      
      // Envoi d'un e-mail pour l'expiration imminente ou déjà expirée
      let subject, text;

      if (subscription.endDate <= today) {
        // Abonnement expiré
        subject = "Votre abonnement a expiré";
        text = `Bonjour ${user.prenom},\n\nVotre abonnement a expiré le ${endDate}. Veuillez renouveler votre abonnement.`;
      } else {
        // Abonnement qui va expirer dans 3 jours
        subject = "Votre abonnement va expirer dans 3 jours";
        text = `Bonjour ${user.prenom},\n\nVotre abonnement expirera le ${endDate}. Il vous reste 3 jours pour renouveler votre abonnement.`;
      }

      await sendEmail(user.email, subject, text);  // Envoi de l'e-mail
    });
  } catch (error) {
    console.error("Erreur lors de la vérification des abonnements : ", error.message);
  }
};


module.exports = { checkExpiringSubscriptions };