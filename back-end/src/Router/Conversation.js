const express = require('express');
const router = express.Router();
const ConversationHandler = require('../Handler/ConversationHandler');

const conversation_handler = new ConversationHandler();

router.post('/add-message', async (req, res) => {
    conversation_handler.add_message(req, res);
});

router.patch('/:id/update-message', async (req, res) => {
    conversation_handler.update_message(req, res);
});

router.get('/get-conversation', async (req, res) => {
    conversation_handler.get_conversation(req, res);
});

router.use("/", (req, res) => {
    res.status(200).json({ Message: "Welcome to the Conversation paths" });
});

module.exports = router;