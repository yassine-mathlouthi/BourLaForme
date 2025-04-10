const User = require("../../Models/user");
const PrivateCoach = require("../../Models/privateCoach");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../../Errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    // Récupération des données du formulaire
    const { prenom, nom, email, password, role, phone, specialty, bio } = req.body;
    
    console.log("Données reçues côté backend:", {
        prenom, nom, email, role, phone, specialty, bio,
        file: req.file ? req.file.filename : null
    });

    try {
        // Vérification de l'email existant
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(StatusCodes.BAD_REQUEST).json({ 
                message: "L'email est déjà utilisé." 
            });
        }

        // Validation pour les coachs
        if (role === "coach") {
            if (!specialty || !bio || !req.file) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Spécialité, bio et image sont obligatoires pour un coach.",
                });
            }
        }

        // Création de l'utilisateur
        const user = await User.create({
            prenom,
            nom,
            email,
            password,
            role,
            phone,
        });

        // Création du profil coach si nécessaire
        if (role === "coach") {
            await PrivateCoach.create({
                user: user._id,
                specialty,
                bio,
                image: req.file.filename,
            });
        }

        // Génération du token JWT
        const token = user.createJWT();

        res.status(StatusCodes.CREATED).json({
            message: `Inscription réussie ! Bienvenue ${prenom} ${nom}`,
            token,
            user: {
                id: user._id,
                prenom: user.prenom,
                nom: user.nom,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        
        if (error.name === 'ValidationError') {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message
            });
        }
        
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Erreur interne lors de l'inscription.",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = { register };