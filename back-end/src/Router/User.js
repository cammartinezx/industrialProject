const express = require('express');
const router = express.Router();
const UserInfoHandler = require('../Handler/UserInfoHandler');

const user_info_handler = new UserInfoHandler();

router.post('/add-user', async (req, res) => {
    user_info_handler.create_user(req, res);
});

router.use("/", (req, res) => {
    res.status(200).json({ Message: "Welcome to the User paths" });
});

module.exports = router;