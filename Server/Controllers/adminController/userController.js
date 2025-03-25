const User = require("../../Models/user");
const Subscription = require("../../Models/subscription");
const SubscriptionType = require("../../Models/subscriptionType");
const PrivateCoach = require("../../Models/privateCoach");

// Get all validated adherents
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

// Get all non-validated adherents
const getNonValidatedUsers = async (req, res) => {
    try {
      const users = await User.find({ isValidated: false, role: 'adherent' }).select('prenom nom email phone');
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ msg: 'Server Error', error });
    }
  };
  
// Get all non-validated coaches with their private coach information
const getNonValidatedCoachs = async (req, res) => {
  try {
    // Trouver tous les utilisateurs non validés avec le rôle "coach"
    const users = await User.find({ isValidated: false, role: 'coach' })
      .select('prenom nom email phone role'); // Sélectionner les champs de l'utilisateur

    // Récupérer les informations des coachs privés pour ces utilisateurs
    const coachesWithInfo = await Promise.all(
      users.map(async (user) => {
        // Récupérer les informations du coach privé
        const privateCoach = await PrivateCoach.findOne({ user: user._id }).select('specialty bio');
        
        // Retourner les données de l'utilisateur avec les informations du coach privé intégrées
        return {
          prenom: user.prenom,
          nom: user.nom,
          email: user.email,
          phone: user.phone,
          specialty: privateCoach ? privateCoach.specialty : null, 
          bio: privateCoach ? privateCoach.bio : null,            
        };
      })
    );

    res.status(200).json({ users: coachesWithInfo });
  } catch (error) {
    res.status(500).json({ msg: 'Server Error', error });
  }
};



// Get all validated coachs
const getValidatedCoachs = async (req, res) => {
  try {
    // Trouver tous les utilisateurs  validés avec le rôle "coach"
    const users = await User.find({ isValidated: true, role: 'coach' })
      .select('prenom nom email phone role'); // Sélectionner les champs de l'utilisateur

    // Récupérer les informations des coachs privés pour ces utilisateurs
    const coachesWithInfo = await Promise.all(
      users.map(async (user) => {
        // Récupérer les informations du coach privé
        const privateCoach = await PrivateCoach.findOne({ user: user._id }).select('specialty bio');
        
        // Retourner les données de l'utilisateur avec les informations du coach privé intégrées
        return {
          prenom: user.prenom,
          nom: user.nom,
          email: user.email,
          phone: user.phone,
          specialty: privateCoach ? privateCoach.specialty : null, 
          bio: privateCoach ? privateCoach.bio : null,            
        };
      })
    );

    res.status(200).json({ users: coachesWithInfo });
  } catch (error) {
    res.status(500).json({ msg: 'Server Error', error });
  }
  };
module.exports = { getValidatedUsers, getNonValidatedUsers, getNonValidatedCoachs, getValidatedCoachs };
