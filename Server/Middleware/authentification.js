const jwt = require('jsonwebtoken');
const { BadRequestError, UnauthenticatedError, ForbiddenError } = require('../Errors');

const auth = (roles = []) => {
  return async (req, res, next) => {
    try {
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      console.log('En-tête Authorization invalide ou manquant')
      throw new UnauthenticatedError('Authentication invalid : aucun token fourni ou format incorrect');
    }

    const token = authHeader.split(' ')[1];

   
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Payload:', payload);

      // Ajouter l'utilisateur dans la requête
      req.user = { userId: payload.userId, prenom: payload.prenom, nom: payload.nom,role: payload.role, };

      // Vérifier si le rôle de l'utilisateur est dans la liste des rôles autorisés
      if (roles.length > 0 && !roles.includes(payload.role)) {
        throw new ForbiddenError(`Accès réservé aux rôles : ${roles.join(', ')}`);
      }

      next();
    } catch (error) {
        // Vérifie si l'erreur a un code de statut, sinon on utilise 500 par défaut
        const statusCode = error.statusCode || 500;
    
        res.status(statusCode).json({
        success: false,
        message: error.message || "Erreur inattendue dans le middleware auth",
   }); 
       
      
    }
  };
};

module.exports = auth;
