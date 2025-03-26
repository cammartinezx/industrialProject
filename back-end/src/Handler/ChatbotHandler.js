const { GoogleAuth } = require("google-auth-library");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const marked = require("marked");

class ChatbotHandler {
    constructor() {
        this.conversationHistory = [];
        this.knowledgeBase = this.loadKnowledgeBase();
        this.hasSentIntro = false; // Track if intro has been sent
    }

    loadKnowledgeBase() {
        const markdownPath = path.resolve(__dirname, "../../ollama-backend/courses-data/comp-2280/unit1_representation.md");

        if (!fs.existsSync(markdownPath)) {
            throw new Error(`Markdown file not found at: ${markdownPath}`);
        }

        let markdownContent = fs.readFileSync(markdownPath, "utf-8");
        markdownContent = markdownContent.replace(/<aside.*?<\/aside>/gs, '');

        return marked.parse(markdownContent, { mangle: false, headerIds: false })
                     .replace(/<[^>]+>/g, '')
                     .replace(/\n+/g, '\n')
                     .trim();
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
        return await client.fetchIdToken('https://ollama-gemma-219112529214.us-central1.run.app/');
    }

    async generateQuiz() {
        try {
            const prompt = `
You are provided the following content:\n${this.knowledgeBase}\n\nGenerate 5 multiple-choice questions with answers based on this content. Format each question as follows:
1. Question: [Question text]
   a) [Option 1]
   b) [Option 2]
   c) [Option 3]
   d) [Option 4]
   Correct Answer: [Correct option]
`;
            const idToken = await this.getAccessToken();
            const response = await axios.post(
                'https://ollama-gemma-219112529214.us-central1.run.app/api/generate',
                { model: "gemma2:9b", prompt: prompt, stream: false },
                { headers: { 'Authorization': `Bearer ${idToken}`, 'Content-Type': 'application/json' } }
            );
            return response.data.response.trim();
        } catch (error) {
            console.error("Error generating quiz:", error);
            throw new Error("Failed to generate quiz. Please try again later.");
        }
    }

    async generateSummary() {
        try {
            const prompt = `
You are provided the following content:\n${this.knowledgeBase}\n\nGenerate a concise summary of this content in 150 words or less.
`;
            const idToken = await this.getAccessToken();
            const response = await axios.post(
                'https://ollama-gemma-219112529214.us-central1.run.app/api/generate',
                { model: "gemma2:9b", prompt: prompt, stream: false },
                { headers: { 'Authorization': `Bearer ${idToken}`, 'Content-Type': 'application/json' } }
            );
            return response.data.response.trim();
        } catch (error) {
            console.error("Error generating summary:", error);
            throw new Error("Failed to generate summary. Please try again later.");
        }
    }

    getOptionMenu() {
        return "Please pick one of the options:\n\nPress the number of the following options:\n1. Quiz mode\n2. Summary mode\n3. Show options again\n\nOr feel free to ask me any questions you might have.";
    }

    async chat(req, res) {
        try {
            // Send intro message automatically on first interaction
            if (!this.hasSentIntro) {
                this.hasSentIntro = true;
                const welcomeMessage = `Hi, I am Nova, your course bot, here to help you navigate this course. ${this.getOptionMenu()}`;
                this.conversationHistory.push({ role: "assistant", content: welcomeMessage });
                return res.json({ response: welcomeMessage });
            }

            const message = req.body.msg ? req.body.msg.trim() : "";
            console.log("Received message:", message);

            if (!message) {
                return res.status(400).json({ error: "Message is required" });
            }

            if (message === "1") {
                const quiz = await this.generateQuiz();
                this.conversationHistory.push({ role: "assistant", content: quiz });
                return res.json({ response: quiz });
            } else if (message === "2") {
                const summary = await this.generateSummary();
                this.conversationHistory.push({ role: "assistant", content: summary });
                return res.json({ response: summary });
            } else if (message === "3") {
                return res.json({ response: this.getOptionMenu() });
            } else {
                const idToken = await this.getAccessToken();
                this.conversationHistory.push({ role: "user", content: message });

                const conversationContext = this.conversationHistory.map(entry => `${entry.role}: ${entry.content}`).join("\n");
                const prompt = `
You are provided the following content:\n${this.knowledgeBase}\n\nUse the conversation history below to maintain context:\n\n${conversationContext}\n\nAnswer the user's latest question strictly based on this content. If the question is unrelated, respond with: "Sorry, the information requested isn't available in the provided content."`;

                const response = await axios.post(
                    'https://ollama-gemma-219112529214.us-central1.run.app/api/generate',
                    { model: "gemma2:9b", prompt: prompt, stream: false },
                    { headers: { 'Authorization': `Bearer ${idToken}`, 'Content-Type': 'application/json' } }
                );

                const responseText = response.data.response.trim();

                if (responseText.includes("isn't available in the provided content")) {
                    const errorMessage = "Sorry, I couldn't find an answer. Here are the options again:\n\n" + this.getOptionMenu();
                    this.conversationHistory.push({ role: "assistant", content: errorMessage });
                    return res.json({ response: errorMessage });
                }

                this.conversationHistory.push({ role: "assistant", content: responseText });
                return res.json({ response: responseText });
            }
        } catch (error) {
            console.error("Error in chatbot handler:", error);
            res.status(500).json({ error: error.message || "Internal Server Error" });
        }
    }
}

module.exports = ChatbotHandler;