const express = require('express');
const router = express.Router();
const { getNotificationsForUser, markNotificationAsReadForUser } = require('../../Controllers/adherentController/notificationController');
const authMiddleware = require("../../Middleware/authentification");

router.get("/", authMiddleware(["adherent"]), getNotificationsForUser);
router.put("/:notificationId", authMiddleware(["adherent"]), markNotificationAsReadForUser);


module.exports = router;