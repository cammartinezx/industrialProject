const { GoogleAuth } = require("google-auth-library");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const marked = require("marked");

class ChatbotHandler {
    constructor() {
        this.conversationHistory = [];
        this.knowledgeBase = this.loadKnowledgeBase();
    }

    loadKnowledgeBase() {
        const markdownPath = path.resolve(__dirname, "../../ollama-backend/courses-data/comp-2280/week-1/1_representation.md");

        if (!fs.existsSync(markdownPath)) {
            throw new Error(`Markdown file not found at: ${markdownPath}`);
        }

        let markdownContent = fs.readFileSync(markdownPath, "utf-8");

        markdownContent = markdownContent.replace(/<aside.*?<\/aside>/gs, '');

        const textContent = marked.parse(markdownContent, { mangle: false, headerIds: false })
                                   .replace(/<[^>]+>/g, '')
                                   .replace(/\n+/g, '\n')
                                   .trim();

        return textContent;
    }

    async getAccessToken() {
        const keyPath = path.resolve(__dirname, "../../ollama-backend/key.json");

        if (!fs.existsSync(keyPath)) {
            throw new Error(`key.json not found at: ${keyPath}`);
        }

        const auth = new GoogleAuth({
            keyFile: keyPath,
            credentials: require(keyPath)
        });

        const client = await auth.getClient();
        const idToken = await client.fetchIdToken('https://ollama-gemma-219112529214.us-central1.run.app/');
        return idToken;
    }

    async chat(req, res) {
        try {
            const message = req.body.msg.trim();

            if (!message) {
                return res.status(400).json({ error: "Message is required" });
            }

            const idToken = await this.getAccessToken();

            this.conversationHistory.push({ role: "user", content: message });

            const conversationContext = this.conversationHistory
                .map(entry => `${entry.role}: ${entry.content}`)
                .join("\n");

            const prompt = `
You are provided the following content:\n${this.knowledgeBase}\n\nUse the conversation history below to maintain context:\n\n${conversationContext}\n\nAnswer the user's latest question strictly based on this content. If the question is unrelated or cannot be answered based on the provided content, respond with: \"Sorry, the information requested isn't available in the provided content.\"`;

            const response = await axios.post(
                'https://ollama-gemma-219112529214.us-central1.run.app/api/generate',
                {
                    model: "gemma2:9b",
                    prompt: prompt,
                    stream: false
                },
                {
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const responseText = response.data.response.trim();

            this.conversationHistory.push({ role: "assistant", content: responseText });

            res.json({ response: responseText });

        } catch (error) {
            console.error("Error in chatbot handler:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

module.exports = ChatbotHandler;
