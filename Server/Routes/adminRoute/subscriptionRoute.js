const express = require('express');
const router = express.Router();
const { updateSubscription} = require('../../Controllers/adminController/subscriptionController');

router.put('/updateSubscription', updateSubscription);

module.exports = router;