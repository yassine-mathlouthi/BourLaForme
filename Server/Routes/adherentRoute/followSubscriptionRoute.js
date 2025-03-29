const express = require('express');
const router = express.Router();
const { getSubscriptionByAdherent } = require('../../Controllers/adherentController/followSubscriptionController');
const authMiddleware = require("../../Middleware/authentification");

router.get('/', authMiddleware(), getSubscriptionByAdherent);



module.exports = router;