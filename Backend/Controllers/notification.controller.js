const Notification = require("../Models/notification.model");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");

// Get notifications for the authenticated user
const getUserNotifications = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const notifications = await Notification.find({ user: userId }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    data: notifications,
  });
});

// Mark a specific notification as read
const markAsRead = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  const notification = await Notification.findOne({ _id: id, user: userId });

  if (!notification) {
    return next(new AppError("Notification not found", 404));
  }

  notification.is_read = true;
  await notification.save();

  res.status(200).json({
    success: true,
    message: "Notification marked as read",
    data: notification,
  });
});

// Mark all notifications for the user as read
const markAllAsRead = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  await Notification.updateMany({ user: userId, is_read: false }, { is_read: true });

  res.status(200).json({
    success: true,
    message: "All notifications marked as read",
  });
});

// Create a new notification (useful for testing or direct API creation)
const createNotification = catchAsync(async (req, res, next) => {
  const { title, body, type } = req.body;
  const userId = req.user?._id || req.body.user;

  if (!userId) {
    return next(new AppError("User is required", 400));
  }

  if (!title || !body) {
    return next(new AppError("Title and body are required", 400));
  }

  const notification = await Notification.create({
    user: userId,
    title,
    body,
    type: type || "info",
  });

  res.status(201).json({
    success: true,
    message: "Notification created successfully",
    data: notification,
  });
});

module.exports = {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  createNotification,
};
