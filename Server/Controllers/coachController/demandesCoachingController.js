const Reservation = require("../../Models/reservationCoach");
const { BadRequestError, NotFoundError } = require("../../Errors");



//Récupération de toutes les demandes d'un coach connecté
const getReservationsForCoach = async (req, res) => {
    try {
        const coachId = req.user.userId;
    
        // Récupérer toutes les réservations où le coach est assigné
        const reservations = await Reservation.find({ coach: coachId })
          .populate("adherent", "prenom nom email phone") // Récupérer les infos de l'adhérent
          .sort({ date: 1, time: 1 }) // Trier par date et heure croissante
          .exec();
    
        // Formater les données pour renvoyer uniquement les informations demandées
        const formattedReservations = reservations.map((reservation) => ({
          adherent: {
            id: reservation.adherent._id,
            prenom: reservation.adherent.prenom,
            nom: reservation.adherent.nom,
            email: reservation.adherent.email,
            phone: reservation.adherent.phone,
          },
          reservation: {
            id: reservation._id, 
            date: reservation.date.toISOString().split("T")[0], // Format YYYY-MM-DD
            time: reservation.time,
          },
        }));
    
        res.status(200).json({reservations: formattedReservations });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
};

//Acceptation ou refusion par un coach d'une demande de réservation

const respondToReservation = async (req, res) => {
    const { reservationId } = req.params;
    const { status } = req.body; // "accepted" ou "rejected"
  
    try {
      // Vérifier que le statut est valide
      if (!["accepted", "rejected"].includes(status)) {
        throw new BadRequestError("Statut invalide, utilisez 'accepted' ou 'rejected'.");
      }
  
      // Trouver la réservation
      const reservation = await Reservation.findOne({ _id: reservationId});
  
      if (!reservation) {
        throw new NotFoundError("Réservation non trouvée." );
      }
  
      // Mise à jour du statut de la réservation
      reservation.status = status;
      await reservation.save();
  
      res.status(200).json({
        
        message: `La réservation a été ${status === "accepted" ? "acceptée" : "refusée"} avec succès.`,
        
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

//Récupérer toutes les réservations acceptées d'un coach connecté.

  const getAcceptedReservationsForCoach = async (req, res) => {
    try {
      const coachId = req.user.userId; 
  
      // Récupérer toutes les réservations où le coach est assigné et où le statut est "accepted"
      const reservations = await Reservation.find({ coach: coachId, status: "accepted" })
        .populate("adherent", "prenom nom email phone") // Récupérer les infos de l'adhérent
        .sort({ date: 1, time: 1 }) // Trier par date et heure croissante
        .exec();
      // Formater les données de réponse pour inclure date et time dans un format lisible
    const formattedReservations = reservations.map(reservation => {
        return {
          adherent: {
            id: reservation.adherent._id,
            prenom: reservation.adherent.prenom,
            nom: reservation.adherent.nom,
            email: reservation.adherent.email,
            phone: reservation.adherent.phone,
          },
          reservationId: reservation._id, 
          date: reservation.date.toISOString().split('T')[0],  // Formatée en "YYYY-MM-DD"
          time: reservation.time,  // Formatée comme elle est stockée
        };
      });


      res.status(200).json({ formattedReservations });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
module.exports = { getReservationsForCoach, respondToReservation, getAcceptedReservationsForCoach };
