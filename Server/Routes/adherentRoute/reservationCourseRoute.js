const express = require("express");
const router = express.Router();
const {  createReservation, getUserReservations} = require("../../Controllers/adherentController/reservationCourseController");
const authMiddleware = require("../../Middleware/authentification");

router.post("/", authMiddleware(["adherent"]), createReservation);
router.get("/", authMiddleware(["adherent"]), getUserReservations);


module.exports = router;