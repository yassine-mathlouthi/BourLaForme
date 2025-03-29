const Subscription = require("../../Models/subscription");
const SubscriptionType = require("../../Models/subscriptionType");
const moment = require("moment");

const getSubscriptionByAdherent = async (req, res) => {
  try {
    const userId = req.user.userId; // ID de l'adhérent connecté

    // Rechercher l'abonnement actif ou expiré de l'adhérent
    const subscription = await Subscription.findOne({ user: userId })
      .populate("type", "name duration price description") // Peupler le type d'abonnement
      .lean();

   

    // Calcul de la durée restante
    const today = moment();
    const endDate = moment(subscription.endDate);
    let remainingDays = endDate.diff(today, "days");

    // S'assurer que la durée restante ne soit pas négative
    remainingDays = remainingDays > 0 ? remainingDays : 0;


      // Formater la réponse avec les informations demandées
      const formattedSubscription = {
        id: subscription._id, // L'ID de l'abonnement
        name: subscription.type.name, // Le nom du type d'abonnement
        duration: subscription.type.duration, // Durée en mois
        startDate: moment(subscription.startDate).format("YYYY-MM-DD"), // Date de début au format souhaité
        endDate: moment(subscription.endDate).format("YYYY-MM-DD"), // Date de fin au format souhaité
        status: subscription.status, // Statut de l'abonnement
        remainingDays, // Nombre de jours restants
      };

    res.status(200).json({
      subscription: formattedSubscription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Une erreur est survenue.",
    });
  }
};

module.exports = { getSubscriptionByAdherent };
