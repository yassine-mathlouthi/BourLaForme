const PrivateCoach = require("../../Models/privateCoach");
const User = require('../../Models/user');
const { BadRequestError, NotFoundError } = require("../../Errors");


// Get Private Coach Profile
const getCoachProfile = async (req, res) => {
    try {

    const baseUrl = `${req.protocol}://${req.get("host")}/uploads/`;
      const coachProfile = await PrivateCoach.findOne({ user: req.user.userId })
        .populate('user', 'prenom nom email phone role')
        .select('specialty bio image user'); // Explicitly select the fields we want
  
      if (!coachProfile) {
        throw new NotFoundError('Coach profile not found');
      }
  
      // Structure the response to explicitly show all fields
      const responseData = {
        
          prenom: coachProfile.user.prenom,
          nom: coachProfile.user.nom,
          email: coachProfile.user.email,
          phone: coachProfile.user.phone,
          role: coachProfile.user.role,
          specialty: coachProfile.specialty,
          bio: coachProfile.bio,
          image: baseUrl + coachProfile.image
      };
  
      res.status(200).json({
        data: responseData
      });
    } catch (error) {
      // Vérifie si l'erreur a un code de statut, sinon on utilise 500 par défaut
      const statusCode = error.statusCode || 500;
    
      res.status(statusCode).json({
      success: false,
      message: error.message || "Une erreur est survenue.",
     });
    }
  };
  
  // Update Private Coach Profile
  const updateCoachProfile = async (req, res) => {
    try {
      const { specialty, bio} = req.body;

      // Vérification de la présence du fichier image
      let image = req.file ? req.file.filename : null;
      // Find the coach profile
      const coachProfile = await PrivateCoach.findOne({ user: req.user.userId });
  
      if (!coachProfile) {
        throw new NotFoundError('Coach profile not found');
      }
  
     
  
      // Update fields if provided
      if (specialty) coachProfile.specialty = specialty;
      if (bio) coachProfile.bio = bio;
      if (image) coachProfile.image = image;
  

      const updatedProfile = await coachProfile.save();
  
     
      res.status(200).json({
        message: "Profil modifié avec succès.",
      });
    } catch (error) {
      // Vérifie si l'erreur a un code de statut, sinon on utilise 500 par défaut
      const statusCode = error.statusCode || 500;
    
      res.status(statusCode).json({
      success: false,
      message: error.message || "Une erreur est survenue.",
      });
    }
  };
  
  module.exports = {
    getCoachProfile,
    updateCoachProfile
  };