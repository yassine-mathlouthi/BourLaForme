const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usershema = new mongoose.Schema({
  prenom: {
    type: String,
    required: [true],
    maxlength: [20, "name can not be more than 10 characters"],
  },
  nom: {
    type: String,
    required: [true],
    maxlength: [20, "name can not be more than 20 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: [8, "Password must be at least 8 characters long"],
    unique: true,
    validate: {
      validator: function (value) {
        // Expression régulière pour valider le mot de passe
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        );
      },
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    },
  },
  role: {
    type: String,
    enum: ["adherent", "coach", "admin"],
    required: [true, "Le rôle est requis"],
  },
  phone: {
    type: String,
    required: false,
  },
  isValidated: {
    type: Boolean,
    default: function () {
      return this.role == "admin"; // Si ce n'est pas un adhérent ou coach, le compte est validé automatiquement
    },
  },
});

// Ajout de l'index
usershema.index({ isValidated: 1 });
// Indexation
usershema.index({ isValidated: 1, role: 1 }); // Index composé pour filtres combinés

usershema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
usershema.methods.createJWT = function () {
  return jwt.sign(
    {
      userId: this._id,
      prenom: this.prenom,
      nom: this.nom,
      email: this.email,
      role: this.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

usershema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", usershema);
