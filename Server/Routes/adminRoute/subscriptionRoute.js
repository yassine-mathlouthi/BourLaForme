const express = require('express');
const router = express.Router();
const authMiddleware = require("../../Middleware/authentification");
const { updateSubscription} = require('../../Controllers/adminController/subscriptionController');

router.put('/updateSubscription/:subscriptionId', authMiddleware(["admin"]), updateSubscription);

module.exports = router;