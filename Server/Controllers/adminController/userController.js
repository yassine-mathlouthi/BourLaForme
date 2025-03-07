const User = require("../../Models/user");

// Get all validated users
const getValidatedUsers = async (req, res) => {
    try {
      const users = await User.find({ isValidated: true })
        .select('prenom nom email phone')
        .populate({
          path: 'subscription',
          populate: {
            path: 'type',
            model: 'SubscriptionType',
            select: 'name'
          },
          select: 'status'
        });
  
      const formattedUsers = users.map(user => ({
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
        email: user.phone,
        abonnementType: user.subscription?.type?.name || null,
        abonnementStatus: user.subscription?.status || null
      }));
  
      res.status(200).json({ users: formattedUsers });
    } catch (error) {
      res.status(500).json({ msg: 'Server Error', error });
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
