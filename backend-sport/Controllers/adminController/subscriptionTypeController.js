// subscriptionTypeController.js
const SubscriptionType = require('../../Models/subscriptionType');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError, InternalServerError, NotFoundError } = require('../../Errors');
  // Ajouter un type d'abonnement
  const addSubscriptionType = async (req, res)  => {
    try {
      console.log("Requête reçue :", req.body);

        const { name, duration, price, description } = req.body;
        if (!name || !duration || !price || !description) {
          throw new BadRequestError("Tous les champs sont obligatoires.");
        }
        const newType = new SubscriptionType({ name, duration, price, description });
        console.log(newType);

        await newType.save();
        res.status(201).json({ message: "Type d'abonnement ajouté avec succès"});
      } catch (err) {
        if (err instanceof BadRequestError) {
          res.status(err.statusCode).json({ message: err.message });
        } else {
          res.status(500).json({ message: "Erreur lors de l'ajout", error: err.message });
        }
      }
  }

  // Consulter tous les types d'abonnements
  const getAllSubscriptionTypes = async (req, res) =>{
    try {
        const types = await SubscriptionType.find();
        res.status(200).json(types);
      } catch (err) {
        res.status(500).json({ message: "Erreur lors de la consultation", error: err.message });
      }
  }

  // Modifier un type d'abonnement
 const updateSubscriptionType = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedType = await SubscriptionType.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedType) {
          throw new NotFoundError("Type d'abonnement non trouvé");
        }
        res.status(200).json({ message: "Type d'abonnement modifié", updatedType });
      } catch (err) {
        if (err instanceof NotFoundError) {
          res.status(err.statusCode).json({ message: err.message });
        } else {
          res.status(500).json({ message: "Erreur lors de la modification", error: err.message });
        }
      }
  }

  // Supprimer un type d'abonnement
  const deleteSubscriptionType =  async (req, res) => {
    try {
        const { id } = req.params;
        const deletedType = await SubscriptionType.findByIdAndDelete(id);
        if (!deletedType) {
          throw new NotFoundError("Type d'abonnement non trouvé");
        }
        res.status(200).json({ message: "Type d'abonnement supprimé" });
      } catch (err) {
        if (err instanceof NotFoundError) {
          res.status(err.statusCode).json({ message: err.message });
        } else {
          res.status(500).json({ message: "Erreur lors de la suppression", error: err.message });
        }
      }
  }


module.exports = {
addSubscriptionType,
getAllSubscriptionTypes,
updateSubscriptionType,
deleteSubscriptionType

};