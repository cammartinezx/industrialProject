const { GoogleAuth } = require("google-auth-library");
const axios = require("axios");
const path = require("path");
const fs = require("fs");

class ChatbotHandler {
    constructor() {
        this.previousQuestion = "";
    }

    async getAccessToken() {
        const keyPath = path.resolve(__dirname, "../../ollama-backend/key.json");

        // Check if the file exists
        if (!fs.existsSync(keyPath)) {
            throw new Error(`key.json not found at: ${keyPath}`);
        }

        const targetAudience = 'https://ollama-gemma-219112529214.us-central1.run.app/';
    
        // Remove "scopes" when using target audience for ID tokens
        const auth = new GoogleAuth({
            keyFile: keyPath,
            // Explicitly specify credentials (optional but recommended)
            credentials: require(keyPath)
        });
    
        const client = await auth.getClient();
        const idToken = await client.fetchIdToken(targetAudience);
        return idToken;
    }

    // Rest of the ChatbotHandler class remains the same
    async chat(req, res) {
        try {
            const message = req.body.msg.trim();

            if (!message) {
                return res.status(400).json({ error: "Message is required" });
            }

            const idToken = await this.getAccessToken();

            const headers = {
                'Authorization': `Bearer ${idToken}`,
                'Content-Type': 'application/json'
            };

            const prompt = this.previousQuestion ? `${this.previousQuestion}\n${message}` : message;

            const response = await axios.post(
                'https://ollama-gemma-219112529214.us-central1.run.app/api/generate',
                {
                    model: "gemma2:9b",
                    prompt: prompt,
                    stream: false
                },
                { headers }
            );

            const responseText = response.data.response;

            this.previousQuestion = message;

            res.json({ response: responseText.trim() });
        } catch (error) {
            console.error("Error in chatbot handler:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

module.exports = ChatbotHandler;