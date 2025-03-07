const User = require('../../Models/user');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError, InternalServerError } = require('../../Errors');




const login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Veuillez fournir un email et un mot de passe' });
    }
    try {
    
  
        user = await User.findOne({ email });
       
      
  
      // Si aucun utilisateur n'est trouvé
      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'email invalide' });
      }
  
      // Vérification du mot de passe
      const isPasswordCorrect = await user.comparePassword(password);
      if (!isPasswordCorrect) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'password invalide' });
      }
  
      
  
      // Génération du JWT (token)
      const token = user.createJWT();
  
      // Réponse avec les informations de l'utilisateur et le token
      res.status(StatusCodes.OK).json({
        message: 'Authentification réussie ! Bienvenue !',
        token,
      });
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erreur interne lors de la connexion.' });
    }
  };
  


  module.exports = {login}