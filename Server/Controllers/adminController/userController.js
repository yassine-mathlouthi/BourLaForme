const User = require("../../Models/user");
const Subscription = require("../../Models/subscription");
const SubscriptionType = require("../../Models/subscriptionType");

// Get all validated users
const getValidatedUsers = async (req, res) => {
  try {
    // Récupérer tous les adhérents validés
    const users = await User.find({ isValidated: true, role: "adherent" })
      .select("prenom nom email phone");

    // Récupérer les abonnements pour ces utilisateurs
    const subscriptions = await Subscription.find({
      user: { $in: users.map((u) => u._id) }
    })
      .populate({ path: "type", select: "name" }) // Récupérer le type d'abonnement
      .select("user status  startDate endDate");

    // Fonction pour formater la date en format YYYY-MM-DD
    const formatDate = (date) => {
      if (!date) return null;
      return date.toISOString().split('T')[0];  // Sélectionne la partie avant 'T' (date sans heure)
    };

    // Associer chaque utilisateur avec son abonnement
    const formattedUsers = users.map(user => {
      const userSubscription = subscriptions.find(sub => sub.user.toString() === user._id.toString());
      return {
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
        phone: user.phone,
        abonnementType: userSubscription?.type?.name || null,
        abonnementStatus: userSubscription?.status || null,
        abonnementStartDate: formatDate(userSubscription?.startDate)  || null, 
        abonnementEndDate: formatDate(userSubscription?.endDate) || null, 
      };
    });

    res.status(200).json({ users: formattedUsers });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
  };

// Get all non-validated users
const getNonValidatedUsers = async (req, res) => {
    try {
      const users = await User.find({ isValidated: false }).select('prenom nom email phone');
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ msg: 'Server Error', error });
    }
  };
  

module.exports = { getValidatedUsers, getNonValidatedUsers };
