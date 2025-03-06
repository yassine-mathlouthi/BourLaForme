// routes/subscriptionTypeRoutes.js
const express = require('express');
const router = express.Router();
const { addSubscriptionType,getAllSubscriptionTypes,updateSubscriptionType,deleteSubscriptionType} = require('../../Controllers/adminController/subscriptionTypeController');

router.post('/', addSubscriptionType);
router.get('/', getAllSubscriptionTypes);
router.put('/:id', updateSubscriptionType);
router.delete('/:id', deleteSubscriptionType);

module.exports = router;