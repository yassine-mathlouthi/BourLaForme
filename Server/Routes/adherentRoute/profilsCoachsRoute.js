const express = require("express");
const router = express.Router();
const { getAllCoachs} = require("../../Controllers/adherentController/ProfilsCoachsController");

router.get("/", getAllCoachs);

module.exports = router;