// routes/subscriptionTypeRoutes.js
const express = require('express');
const router = express.Router();
const { validateUser} = require('../../Controllers/adminController/validateUserController');

router.post('/:userId/:subscriptionTypeId', validateUser);

module.exports = router;