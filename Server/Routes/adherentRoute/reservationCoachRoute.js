const express = require("express");
const router = express.Router();
const { createReservation, getReservationsByAdherent, updateReservationDate, cancelReservation} = require("../../Controllers/adherentController/ReservationCoachController");
const authMiddleware = require("../../Middleware/authentification");

router.post("/", authMiddleware(), createReservation);
router.get("/", authMiddleware(), getReservationsByAdherent);
router.put("/:reservationId", authMiddleware(), updateReservationDate);
router.delete("/:reservationId", authMiddleware(), cancelReservation);

module.exports = router;
