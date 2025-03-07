const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../Errors');

const auth = (roles = []) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      console.log('En-tête Authorization invalide ou manquant')
      throw new UnauthenticatedError('Authentication invalid');
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Payload:', payload);

      // Ajouter l'utilisateur dans la requête
      req.user = { userId: payload.userId, prenom: payload.prenom, nom: payload.nom };

      

      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthenticatedError('Token has expired');
      } else if (error.name === 'JsonWebTokenError') {
        throw new UnauthenticatedError('Invalid token');
      } else {
        throw new UnauthenticatedError('Authentication failed');
      }
    }
  };
};

module.exports = auth;
