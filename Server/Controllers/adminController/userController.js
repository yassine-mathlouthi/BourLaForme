const User = require("../../Models/user");

// Get all validated users
const getValidatedUsers = async (req, res) => {
  try {
    const users = await User.find({ isValidated: true });
    res.status(200).json({ users });
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
