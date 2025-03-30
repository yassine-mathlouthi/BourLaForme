const express = require('express');
const router = express.Router();
const { getNotificationsForAdmin, markNotificationAsReadForAdmin } = require('../../Controllers/adminController/notificationController');
const authMiddleware = require("../../Middleware/authentification");

router.get("/", authMiddleware(), getNotificationsForAdmin);
router.put("/:notificationId", authMiddleware(), markNotificationAsReadForAdmin);

module.exports = router;