// routes/subscriptionTypeRoutes.js
const express = require('express');
const router = express.Router();
const { validateUser, validateCoach} = require('../../Controllers/adminController/validateUserController');

router.post('/:userId/:subscriptionTypeId', validateUser);
router.put('/:userId', validateCoach);
module.exports = router;