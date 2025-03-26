const SubscriptionType = require('../../Models/subscriptionType');
const Subscription = require('../../Models/subscription');
const User = require('../../Models/user');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError, InternalServerError, NotFoundError } = require('../../Errors');

//validateAdherent
validateUser = async (req, res) => {
    const { userId, subscriptionTypeId } = req.params;  // `subscriptionTypeId` est l'ID de l'abonnement sélectionné par l'admin
    const { startDate, endDate } = req.body; // Ajout des dates comme paramètres dans le body

    try {
        if (!userId || !subscriptionTypeId|| !startDate || !endDate) {
            throw new BadRequestError("L'ID de l'utilisateur, l'ID du type d'abonnement, la date de début et la date de fin sont obligatoires.");
          }
      
          const user = await User.findById(userId);
          if (!user) {
            throw new NotFoundError("Utilisateur non trouvé");
          }

        // Trouver le type d'abonnement choisi par l'admin
          const subscriptionType = await SubscriptionType.findById(subscriptionTypeId);
          if (!subscriptionType) {
            throw new NotFoundError("Type d'abonnement non trouvé");
          }
      
    
        // Créer un abonnement pour l'adhérent validé en utilisant le type d'abonnement choisi
        const newSubscription = new Subscription({
          type: subscriptionType._id,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          user: user._id,
        });
    
        // Sauvegarder l'abonnement
        await newSubscription.save();
    
        
         // Marquer l'adhérent comme validé
       
        await User.findByIdAndUpdate(
          userId,
          { isValidated: true },
          { new: true }
        );
        res.status(200).json({ message: 'Utilisateur validé et abonnement ajouté avec succès' });
      }  catch (err) {
        if (err instanceof BadRequestError || err instanceof NotFoundError) {
          res.status(err.statusCode).json({ message: err.message });
        } else {
          res.status(500).json({ message: "Erreur lors de l'assignation", error: err.message });
        }
      }



};

//validateCoach
validateCoach = async (req, res) => {
  const { userId} = req.params;  

  try {
      if (!userId) {
          throw new BadRequestError("L'ID de l'utilisateur est obligatoire.");
        }
    
        const user = await User.findById(userId);
        if (!user) {
          throw new NotFoundError("Utilisateur non trouvé");
        }

      
       // Marquer le coach comme validé
     
      await User.findByIdAndUpdate(
        userId,
        { isValidated: true },
        { new: true }
      );
      res.status(200).json({ message: 'Coach validé  avec succès' });
    }  catch (err) {
      if (err instanceof BadRequestError || err instanceof NotFoundError) {
        res.status(err.statusCode).json({ message: err.message });
      } else {
        res.status(500).json({ message: "Erreur lors de l'assignation", error: err.message });
      }
    }



};
module.exports = {
 
    validateUser,
    validateCoach
  };