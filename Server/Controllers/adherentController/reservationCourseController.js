const mongoose = require("mongoose");
const Reservation = require("../../Models/reservationCourse");
const Course = require("../../Models/course");
const User = require("../../Models/user");
const { BadRequestError, NotFoundError } = require("../../Errors");



const createReservation = async (req, res) => {
    
  
    const { courseId } = req.body;
    
    const userId = req.user.userId;
  
    const session = await mongoose.startSession();
    // Démarre une session MongoDB pour supporter les transactions
    // Permet de regrouper plusieurs opérations de manière atomique
    
  
    try {
      session.startTransaction();
      // Commence une transaction dans la session
      // Toutes les opérations suivantes font partie de cette transaction
      

        // Vérifier si l'utilisateur a déjà réservé ce cours
      const existingReservation = await Reservation.findOne({
        userId,
        courseId
      }).session(session);

      if (existingReservation) {
        await session.abortTransaction();
        session.endSession();
        throw new BadRequestError('Vous avez déjà réservé ce cours');
      }


      // Vérifier la disponibilité du cours et réserver une place
      const course = await Course.findOneAndUpdate(
        { 
          _id: courseId,                    // Recherche par ID du cours
          availableSeats: { $gt: 0 }        // Condition : places disponibles > 0
        },
        { 
          $inc: { availableSeats: -1 }      // Décrémente de 1 les places disponibles
        },
        { 
          new: true,                        
          session,                         
          useFindAndModify: false          
        }
      );
      // Opération atomique cruciale :
      // - Recherche et met à jour en une seule opération
      // - Réussit uniquement s'il y a des places
      // - Empêche les conditions de course
      // - Retourne null si aucune correspondance (cours non trouvé ou pas de places)
  
      if (!course) {
        
        const existingCourse = await Course.findById(courseId).session(session);
        // Vérifie si le cours existe vraiment
        
        if (!existingCourse) {
          // Le cours n'existe pas
          await session.abortTransaction();  // Annule la transaction
          session.endSession();             // Termine la session
          throw new NotFoundError('Cours non trouvé' );
          
        }
  
        // Le cours existe mais pas de places disponibles
        await session.abortTransaction();
        session.endSession();
        throw new BadRequestError('Désolé, il n\'y a plus de places disponibles');
    
      }
  
      
  
      // Crée la réservation acceptée
      const reservation = new Reservation({
        userId,
        courseId,
        status: 'accepted'             
      });
  
      await reservation.save({ session });
      // Sauvegarde la réservation dans la transaction
  
      await session.commitTransaction();
      // Valide tous les changements (décrémentation + réservation)
      
      session.endSession();
      // Termine la session
  
      
  
      res.status(201).json({
        message: 'Réservation acceptée avec succès',
        
      });
  
    } catch (error) {
      // Ne tente d'annuler la transaction que si elle n'a pas déjà été annulée
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    await session.endSession();

       // Vérifie si l'erreur a un code de statut, sinon on utilise 500 par défaut
       const statusCode = error.statusCode || 500;
      // Gère toutes les erreurs qui surviennent
      
      res.status(statusCode).json({ 
        success: false,
        message: error.message || "Une erreur est survenue.",
      });
      // Envoie une réponse d'erreur
    }
  };


  
// // Récupère toutes les réservations de l'utilisateur connecté

const getUserReservations = async (req, res) => {
    try {
      
      const reservations = await Reservation.find({ userId: req.user.userId })
        .populate({
          path: 'courseId', 
          select: 'name description duration availableSeats coachName schedule level price image' 
        })
        .select('_id status') 
        .sort({ createdAt: -1 }); // Trie par date de création (plus récent en premier)
  
         // Ajouter l'URL complète pour les images
        const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
        const updatedReservations = reservations.map(reservation => ({
            ...reservation.toObject(),
            courseId: {
                ...reservation.courseId.toObject(),
                image: baseUrl + reservation.courseId.image
            }
        }));
  
      
      res.status(200).json({
        reservations: updatedReservations
      });
    } catch (error) {
      // Vérifie si l'erreur a un code de statut, sinon on utilise 500 par défaut
      const statusCode = error.statusCode || 500;
      res.status(500).json({ 
        success: false,
        message: error.message || "Une erreur est survenue.",
      });
    }
  };



  module.exports = {
    createReservation,
    getUserReservations
  };