const express = require('express');
const router = express.Router();
const ChatbotHandler = require('../Handler/ChatbotHandler');

const chatbot_handler = new ChatbotHandler();


router.post('/ask', async (req, res) => {
    chatbot_handler.chat(req, res);
});

router.use("/", (req, res) => {
    res.status(200).json({ Message: "Welcome to the Chatbot paths" });
});

module.exports = router;