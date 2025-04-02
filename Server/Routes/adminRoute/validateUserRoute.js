// routes/subscriptionTypeRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require("../../Middleware/authentification");
const { validateUser, validateCoach} = require('../../Controllers/adminController/validateUserController');

router.post('/:userId/:subscriptionTypeId', authMiddleware(["admin"]), validateUser);
router.put('/:userId', authMiddleware(["admin"]), validateCoach);
module.exports = router;