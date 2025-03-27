const mongoose = require("mongoose");
const Reservation = require("../../Models/reservationCoach");
const { BadRequestError, NotFoundError } = require("../../Errors");


// réservation d'un coach par l'adhérent

const createReservation = async (req, res) => {

  try {
    const { coachId, date, time  } = req.body;
    const adherentId = req.user.userId;
  // Vérification que la date et l'heure sont présentes
    if (!date || !time) {
      throw new BadRequestError("La date et l'heure sont requises." );
    }

     // Vérification du format de l'heure
     const timeRegex = /^\d{2}:\d{2}$/;
     if (!timeRegex.test(time)) {
       throw new BadRequestError("Le format de l'heure doit être HH:mm." );
     }

    const reservation = new Reservation({
      adherent: adherentId,
      coach: coachId,
      date,
      time,
    });
    
    await reservation.save();
   
    
    res.status(201).json({ message: 'Coach réservé avec succès.' });
  } catch (error) {
   // Vérifie si l'erreur a un code de statut, sinon on utilise 500 par défaut
   const statusCode = error.statusCode || 500;
    
   res.status(statusCode).json({
     success: false,
     message: error.message || "Une erreur est survenue.",
   });
 }
};


//get toutes les réservations d'un adhérent connecté.
const getReservationsByAdherent = async (req, res) => {
  try {
    const reservations = await Reservation.find({ adherent: req.user.userId })
      .populate("coach", "prenom nom email phone")
      .exec();

        // Formater la date pour chaque réservation
    const formattedReservations = reservations.map((reservation) => {
      // Formater la date au format "YYYY-MM-DD"
      const formattedDate = reservation.date.toISOString().split('T')[0];

      return {
        ...reservation.toObject(),
        date: formattedDate, // Ajouter la date formatée
      };
    });
    res.status(200).json({ reservations: formattedReservations  });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Modification de réservation par l'adhérent.

const updateReservationDate = async (req, res) => {
  const { reservationId } = req.params;
  const { date, time } = req.body;

  try {
   
    // Recherche de la réservation
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      throw new NotFoundError("Réservation non trouvée");
    }

    

    
    // Si le date est fourni, on met à jour la date 
    if (date) {
      reservation.date = date;
    }
    // Si le temps est fourni, on met à jour la time 
    if (time) {
      reservation.time = time;
    }
    await reservation.save(); // Sauvegarde dans la base de données

    res.status(200).json({message: "Réservation mise à jour avec succès"});
  } catch (error) {
   // Vérifie si l'erreur a un code de statut, sinon on utilise 500 par défaut
   const statusCode = error.statusCode || 500;
    
   res.status(statusCode).json({
     success: false,
     message: error.message || "Une erreur est survenue.",
   });
 }
};

//Annulation de réservation par l'adhérent.
const cancelReservation = async (req, res) => {
  const { reservationId } = req.params;

  try {
    // Vérification si la réservation existe
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      throw new NotFoundError("Réservation non trouvée");
    }

    // Suppression de la réservation
    await Reservation.findByIdAndDelete(reservationId);

    res.status(200).json({message: "Réservation annulée avec succès" });
  } catch (error) {
    // Vérifie si l'erreur a un code de statut, sinon on utilise 500 par défaut
    const statusCode = error.statusCode || 500;
    
    res.status(statusCode).json({
      success: false,
      message: error.message || "Une erreur est survenue.",
    });
  }
};


module.exports = { createReservation, getReservationsByAdherent, updateReservationDate, cancelReservation };
