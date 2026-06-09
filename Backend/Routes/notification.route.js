const express = require("express");
const authenticateUser = require("../Middlewares/auth.middleware");
const {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  createNotification,
} = require("../Controllers/notification.controller");

const router = express.Router();

// All notification routes require authentication
router.use(authenticateUser);

router.get("/", getUserNotifications);
router.post("/", createNotification);
router.patch("/read-all", markAllAsRead);
router.patch("/:id/read", markAsRead);

module.exports = router;
