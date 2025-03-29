const mongoose = require("mongoose");
const Reservation = require("../../Models/reservationCoach");
const PrivateCoach = require("../../Models/privateCoach"); // Ajoute cette ligne en haut de ton fichier

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
      .populate("coach", "prenom nom email phone") // Peupler l'info du coach depuis User
      .exec();

    // Construire l'URL complète pour les images
    const baseUrl = `${req.protocol}://${req.get("host")}/uploads/`;

    // Récupérer les IDs des coachs
    const coachIds = reservations.map(reservation => reservation.coach?._id).filter(Boolean);
    console.log("Coach IDs récupérés:", coachIds);

    // Récupérer les profils PrivateCoach
    const privateCoaches = await PrivateCoach.find({ user: { $in: coachIds } })
      .select("user image bio specialty")
      .lean();

    if (privateCoaches.length === 0) {
      console.warn("⚠ Aucun profil de coach trouvé dans PrivateCoach !");
    }

    // Créer un map des profils PrivateCoach
    const privateCoachMap = {};
    privateCoaches.forEach(coach => {
      privateCoachMap[coach.user] = coach;
    });

    console.log("Profils PrivateCoach trouvés:", privateCoachMap);

    // Transformer les données
    const formattedReservations = reservations.map(reservation => {
      const formattedDate = reservation.date.toISOString().split("T")[0];
      let privateCoach = null;

      try {
        privateCoach = reservation.coach ? privateCoachMap[reservation.coach._id] : null;
      } catch (error) {
        console.error("Erreur lors de l'accès à privateCoachMap:", error);
      }

      return {
        ...reservation.toObject(),
        date: formattedDate,
        coach: {
          ...reservation.coach.toObject(),
          image: privateCoach?.image ? baseUrl + privateCoach.image : null,
          bio: privateCoach?.bio || null,
          specialty: privateCoach?.specialty || null,
        },
      };
    });

    res.status(200).json({ reservations: formattedReservations });
  } catch (error) {
    console.error("Erreur dans getReservationsByAdherent:", error);
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
