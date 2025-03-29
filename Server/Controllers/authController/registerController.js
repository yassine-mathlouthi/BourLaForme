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
    // Si le rôle est coach, vérifier que specialty et bio sont fournis avant de créer l'utilisateur
    if (role === "coach" && (!specialty || !bio || !req.file)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Spécialité, bio et image sont obligatoires pour un coach.",
      });


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

    // Si le rôle est coach, créer également un profil dans PrivateCoach
    if (role === "coach") {
      const image = req.file ? req.file.filename : null;
      await PrivateCoach.create({
        user: user._id,
        specialty,
        bio,
        image,
      });
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
