/**
 * @namespace Notification
 * @description Routes related to notifications
 */
const express = require("express");
const router = express.Router();
const NotificationHandler = require("../Handler/NotificationHandler");

const notification_handler = new NotificationHandler();

/**
 * @memberof Notification
 * @name Create a new join-room-request notification
 * @path {POST} notification/create-new
 * @body {String} from The sender user ID
 * @body {String} to The receiver user ID
 * @body {String} type The type of notification: join-request or help-request
 * @code {200} Notification Successfully created
 * @code {404} Error Creating Notification - User not found
 * @code {400} Error Creating Notification - Message is empty
 * @code {500} Backend error from the database
 * @response {String} message See description of the different status codes
 */
router.post("/create-new-notification", (req, res) => {
    notification_handler.create_notification(req, res);
});

router.get("/get-notification/:user_id", (req, res) => {
    notification_handler.get_notification(req, res);
});

router.use("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Notification paths" });
});

module.exports = router;
