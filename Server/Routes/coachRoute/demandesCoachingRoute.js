const express = require("express");
const router = express.Router();
const { getReservationsForCoach, respondToReservation, getAcceptedReservationsForCoach  } = require("../../Controllers/coachController/demandesCoachingController");
const authMiddleware = require("../../Middleware/authentification");

// Route pour que le coach consulte ses réservations
router.get("/", authMiddleware(), getReservationsForCoach);
router.put("/:reservationId", authMiddleware(), respondToReservation);
router.get("/AcceptedReservations", authMiddleware(), getAcceptedReservationsForCoach);

module.exports = router;