// routes/subscriptionTypeRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require("../../Middleware/authentification");
const { addSubscriptionType,getAllSubscriptionTypes,updateSubscriptionType,deleteSubscriptionType} = require('../../Controllers/adminController/subscriptionTypeController');

router.post('/', authMiddleware(["admin"]), addSubscriptionType);
router.get('/', getAllSubscriptionTypes);
router.put('/:id', authMiddleware(["admin"]), updateSubscriptionType);
router.delete('/:id', authMiddleware(["admin"]), deleteSubscriptionType);

module.exports = router;