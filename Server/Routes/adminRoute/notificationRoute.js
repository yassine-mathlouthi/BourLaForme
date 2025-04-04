const express = require('express');
const router = express.Router();
const { getNotificationsForAdmin, markNotificationAsReadForAdmin } = require('../../Controllers/adminController/notificationController');
const authMiddleware = require("../../Middleware/authentification");

router.get("/", authMiddleware(["admin"]), getNotificationsForAdmin);
router.put("/:notificationId", authMiddleware(["admin"]), markNotificationAsReadForAdmin);

module.exports = router;