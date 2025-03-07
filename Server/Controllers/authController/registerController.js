const User = require("../../Models/user");
const PrivateCoach = require("../../Models/privateCoach");

const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  InternalServerError,
} = require("../../Errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { prenom, nom, email, password, role, phone, specialty, bio } =
    req.body;

  try {
    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "L'email est déjà utilisé." });
    }
    // Création d'un nouveau user
    const user = await User.create({
      prenom,
      nom,
      email,
      password,
      role,
      phone,
    });

    // Si le rôle est coach, nous créons également un profil dans PrivateCoach
    if (role === "coach") {
      if (!specialty || !bio) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Spécialité et bio sont obligatoires pour un coach.",
        });
      }

      // Création du profil de coach privé
      const privateCoach = new PrivateCoach({
        user: user._id,
        specialty,
        bio,
      });

      await privateCoach.save();
    }

    // Création du JWT
    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({
      message: `Inscription réussie ! Bienvenue ${prenom} ${nom}`,
      token,
    });
  } catch (error) {
    // Gestion des erreurs internes
    if (error instanceof BadRequestError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
    console.error("Erreur lors de l'inscription  de l'utilisateur :", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Erreur interne lors de l'inscription.",
    });
  }
};

module.exports = {
  register,
};
