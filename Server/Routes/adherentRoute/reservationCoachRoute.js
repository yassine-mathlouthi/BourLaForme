const express = require("express");
const router = express.Router();
const { createReservation, getReservationsByAdherent, updateReservationDate, cancelReservation} = require("../../Controllers/adherentController/ReservationCoachController");
const authMiddleware = require("../../Middleware/authentification");

router.post("/", authMiddleware(["adherent"]), createReservation);
router.get("/", authMiddleware(["adherent"]), getReservationsByAdherent);
router.put("/:reservationId", authMiddleware(["adherent"]), updateReservationDate);
router.delete("/:reservationId", authMiddleware(["adherent"]), cancelReservation);

module.exports = router;
