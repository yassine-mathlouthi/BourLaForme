const express = require("express");
const router = express.Router();
const { getReservationsForCoach, respondToReservation, getAcceptedReservationsForCoach  } = require("../../Controllers/coachController/demandesCoachingController");
const authMiddleware = require("../../Middleware/authentification");

// Route pour que le coach consulte ses réservations
router.get("/", authMiddleware(["coach"]), getReservationsForCoach);
router.put("/:reservationId", authMiddleware(["coach"]), respondToReservation);
router.get("/AcceptedReservations", authMiddleware(["coach"]), getAcceptedReservationsForCoach);

module.exports = router;