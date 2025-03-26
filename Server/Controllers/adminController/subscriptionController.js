const User = require("../../Models/user");
const Subscription = require("../../Models/subscription");
const SubscriptionType = require("../../Models/subscriptionType");
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError, InternalServerError, NotFoundError } = require('../../Errors');

const updateSubscription = async (req, res) => {
    try {
      const { subscriptionId } = req.params; // ID de l'abonnement à modifier
      const { startDate, endDate, type } = req.body; 
  
      // Vérifier si l'abonnement existe
      const subscription = await Subscription.findById(subscriptionId);
      if (!subscription) {
        throw new NotFoundError("Subscription not found");
      }
  
      // Mettre à jour les champs s'ils sont fournis dans la requête
      if (startDate) subscription.startDate = new Date(startDate);
      if (endDate) subscription.endDate = new Date(endDate);
      
      if (type) {  
        // Vérifier si le type d'abonnement existe
        const subscriptionType = await SubscriptionType.findById(type);
        if (!subscriptionType) {
          throw new BadRequestError("Invalid subscription type" );
        }
        subscription.type = type;
      }
  
      // Mise à jour automatique du statut
      
      subscription.status =  "active" ;
  
      // Sauvegarder les modifications
      await subscription.save();
  
      res.status(200).json({ msg: "Subscription updated successfully"});
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'abonnement :", error);
        res.status(500).json({ msg: "Server error", error });
    }
  };


  module.exports = {updateSubscription};
  
  