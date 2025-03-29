const express = require("express");
const router = express.Router();
const {  createReservation, getUserReservations} = require("../../Controllers/adherentController/reservationCourseController");
const authMiddleware = require("../../Middleware/authentification");

router.post("/", authMiddleware(), createReservation);
router.get("/", authMiddleware(), getUserReservations);


module.exports = router;