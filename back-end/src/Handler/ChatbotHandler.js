const { spawn } = require("child_process");

class ChatbotHandler {
    async chat(req, res) {
        try {
            const message = req.body.msg.trim();

            if (!message) {
                return res.status(400).json({ error: "Message is required" });
            }

            // Run the Ollama CLI to get the response from Llama 3.2 8B model
            const ollamaProcess = spawn("ollama", ["run", "llama3"], {
                stdio: ["pipe", "pipe", "inherit"], // Pipe input/output
            });

            let responseText = "";

            ollamaProcess.stdout.on("data", (data) => {
                responseText += data.toString();
            });

            ollamaProcess.stdin.write(message + "\n");
            ollamaProcess.stdin.end();

            ollamaProcess.on("close", () => {
                res.json({ response: responseText.trim() });
            });
        } catch (error) {
            console.error("Error in chatbot handler:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

module.exports = ChatbotHandler;
