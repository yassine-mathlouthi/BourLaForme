const express = require('express');
const router = express.Router();
const { getNotificationsForUser, markNotificationAsReadForUser } = require('../../Controllers/adherentController/notificationController');
const authMiddleware = require("../../Middleware/authentification");

router.get("/", authMiddleware(), getNotificationsForUser);
router.put("/:notificationId", authMiddleware(), markNotificationAsReadForUser);


module.exports = router;