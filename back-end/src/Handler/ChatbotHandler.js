const { GoogleAuth } = require("google-auth-library");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const marked = require("marked");
const url = "http://localhost:3001";


class ChatbotHandler {
    constructor() {
        this.conversationHistory = [];
        //this.knowledgeBase = null;
        this.hasSentIntro = false; // Track if intro has been sent
    }

    // loadKnowledgeBase() {
    //     const markdownPath = path.resolve(__dirname, "../../ollama-backend/courses-data/comp-2280/unit1_representation.md");

    //     if (!fs.existsSync(markdownPath)) {
    //         throw new Error(`Markdown file not found at: ${markdownPath}`);
    //     }

    //     let markdownContent = fs.readFileSync(markdownPath, "utf-8");
    //     markdownContent = markdownContent.replace(/<aside.*?<\/aside>/gs, '');

    //     return marked.parse(markdownContent, { mangle: false, headerIds: false })
    //                  .replace(/<[^>]+>/g, '')
    //                  .replace(/\n+/g, '\n')
    //                  .trim();
    // }

 async loadKnowledgeBase(fileTitle) {
  try {
      console.log("Fetching pre-signed URL...");
      console.log(fileTitle);

      // Get the pre-signed URL
      const res = await axios.get(`http://localhost:3001/s3Url-download`, {
          params: { fileName: fileTitle },
      });
    

      const s3Url = res.data.urlS3?.downloadURL;
   
      if (!s3Url) {
          throw new Error("Failed to get S3 file URL");
      }

      console.log("S3 URL received:", s3Url);

      // Fetch the markdown file
      const fileResponse = await axios.get(s3Url);
      //console.log(fileResponse);
      let markdownContent = fileResponse.data;


      // Process the markdown content
      markdownContent = markdownContent.replace(/<aside.*?<\/aside>/gs, '');

      //Log cleaned content before parsing
      //console.log("Cleaned Markdown Content:", markdownContent);

      return marked.parse(markdownContent, { mangle: false, headerIds: false })
                   .replace(/<[^>]+>/g, '')
                   .replace(/\n+/g, '\n')
                   .trim();
      
  } catch (error) {
      console.error("Error loading knowledge base:", error);
      throw new Error("Failed to load knowledge base.");
  }
}

//  async loadKnowledgeBase() {
//   try {
//       console.log("Fetching pre-signed URL...");

//       // Get the pre-signed URL
//       const res = await axios.get(`http://localhost:3001/s3Url-download`, {
//           params: { fileName: "stat3000/representation" },
//       });

//       const s3Url = res.data.urlS3?.downloadURL;
//       if (!s3Url) {
//           throw new Error("Failed to get S3 file URL");
//       }

//       console.log("S3 URL received:", s3Url);

//       // Fetch the markdown file
//       const fileResponse = await axios.get(s3Url);
//       console.log("Raw Markdown Content:", fileResponse);
//       let markdownContent = fileResponse.data;

//       // Log raw content for debugging
//       console.log("Raw Markdown Content:", markdownContent);

//       // Process the markdown content
//       markdownContent = markdownContent.replace(/<aside.*?<\/aside>/gs, '');

//       //Log cleaned content before parsing
//       console.log("Cleaned Markdown Content:", markdownContent);

//       return marked.parse(markdownContent, { mangle: false, headerIds: false })
//                    .replace(/<[^>]+>/g, '')
//                    .replace(/\n+/g, '\n')
//                    .trim();
      
//   } catch (error) {
//       console.error("Error loading knowledge base:", error);
//       throw new Error("Failed to load knowledge base.");
//   }
// }

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


    async generateChatbotResponse(prompt, knowledgeBase) {
        try {
            // Append the knowledge base to the prompt
            const fullPrompt = `${prompt}**Content:**  ${knowledgeBase}`;
            console.log(fullPrompt);
    
            // Get the access token for authentication
            const idToken = await this.getAccessToken();
    
            // Send the request to the chatbot API
            const response = await axios.post(
                'https://ollama-gemma-219112529214.us-central1.run.app/api/generate',
                { model: "gemma2:9b", prompt: fullPrompt, stream: false },
                { headers: { 'Authorization': `Bearer ${idToken}`, 'Content-Type': 'application/json' } }
            );
    
            // Return the generated response
            return response.data.response.trim();
        } catch (error) {
            console.error("Error generating chatbot response:", error);
            throw new Error("Failed to generate response. Please try again later.");
        }
    }
    

    getOptionMenu(prompts) {
    
        let menu = "Pick one of the following options and press the corresponding number:  \n";

        // Check if prompts is an array and contains prompts
        if (Array.isArray(prompts) && prompts.length > 0) {
            // Use a local counter to number the options dynamically
            for (let i = 0; i < prompts.length; i++) {
                menu += `**${String(i+1)}.** ${prompts[i].title}  \n`; // Add number dynamically
            }

            menu += `**${String(prompts.length + 1)}.** Show options again  \n`;  // Add option to show options again
            menu += `Or feel free to ask me any questions you might have.`;
        } else {
            menu = 'No prompts available.';
        }

        return menu;
    }
    

    async getPrompts(courseId) {
        try {
          const response = await axios.get(`${url}/course/${courseId}/get-prompts`);
          let prompts = response.data.prompts;
          if (!prompts || prompts.length === 0) {
            const defaultPrompts = new Map();
      
            defaultPrompts.set("Quiz mode", `You are an expert educational assistant. based on the content, generate **5 multiple-choice questions** with answers. The goal is to help a student test their understanding of the material.
      
      **Instructions:**  
      - Write **clear and concise** questions.  
      - Each question should have **4 options** labeled a) to d).  
      - Format everything in **Markdown**, using **bold** for labels like "Question" and "Correct Answer".  
      - Ensure proper newlines after each option using **two spaces at the end** of each line.  
      
      **Format exactly like this:**  
      
      **1. Question:** [Your question here]  
      a) [Option A]  
      b) [Option B]  
      c) [Option C]  
      d) [Option D]  
      **Correct Answer:** [Correct option letter]  
      ---
      
      Generate exactly 5 questions in this format.`);
      
            defaultPrompts.set("Summary mode", `You are an expert educational assistant. Based on the following content, generate a **comprehensive summary** that clearly explains the material to a student who is reviewing or studying it.
      
      **Instructions:**  
      - Write in a **clear, informative, and approachable** tone.  
      - Emphasize the **main concepts and learning objectives** of the material.  
      - Use **markdown formatting** to make important terms and concepts stand out (e.g., use **bold** for terminology, use bullet points for lists).  
      - Do **not copy-paste** the original text—paraphrase and explain the ideas in a simpler way.  
      - Where appropriate, provide examples to clarify abstract concepts.  
      - End the summary with a **“Key Takeaways”** section that highlights the most essential points (3–7 bullets).  
      
      **Format Example:**  
      
      [Multi-paragraph summary here]  
      
      **Key Takeaways:**  
      - ...  
      - ...  
      - ...`);
     
            return defaultPrompts;
          }
          return prompts;
        } catch (error) {
          console.error("Error fetching prompts:", error);
          return new Map(); // Return empty map on failure
        }
      }

//     async chat(req, res) {
//         try {
//             const { fileTitle, courseId } = req.body;
//             const knowledgeBase = await this.loadKnowledgeBase(fileTitle);
//             const coursePrompts = await this.getPrompts(courseId);
//             // Send intro message automatically on first interaction
//             if (!this.hasSentIntro) {
//                 this.hasSentIntro = true;
//                 const welcomeMessage = `${this.getOptionMenu(coursePrompts)}`;
//                 this.conversationHistory.push({ role: "assistant", content: welcomeMessage });
//                 return res.json({ response: welcomeMessage });
//             }

//             const message = req.body.msg ? req.body.msg.trim() : "";
//             console.log("Received message:", message);

//             if (!message) {
//                 return res.status(400).json({ error: "Message is required" });
//             }

//             if (message === "1") {
//                 const quiz = await this.generateQuiz(knowledgeBase);
//                 this.conversationHistory.push({ role: "assistant", content: quiz });
//                 return res.json({ response: quiz });
//             } else if (message === "2") {
//                 const summary = await this.generateSummary(knowledgeBase);
//                 this.conversationHistory.push({ role: "assistant", content: summary });
//                 return res.json({ response: summary });
//             } else if (message === "3") {
//                 return res.json({ response: this.getOptionMenu() });
//             } else {
//                 const idToken = await this.getAccessToken();
//                 this.conversationHistory.push({ role: "user", content: message });

//                 const conversationContext = this.conversationHistory.map(entry => `${entry.role}: ${entry.content}`).join("\n");
//                 const prompt = `
// You are provided the following content:\n${this.knowledgeBase}\n\nUse the conversation history below to maintain context:\n\n${conversationContext}\n\nAnswer the user's latest question strictly based on this content. If the question is unrelated, respond with: "Sorry, the information requested isn't available in the provided content."`;

//                 const response = await axios.post(
//                     'https://ollama-gemma-219112529214.us-central1.run.app/api/generate',
//                     { model: "gemma2:9b", prompt: prompt, stream: false },
//                     { headers: { 'Authorization': `Bearer ${idToken}`, 'Content-Type': 'application/json' } }
//                 );

//                 const responseText = response.data.response.trim();

//                 if (responseText.includes("isn't available in the provided content")) {
//                     const errorMessage = "Sorry, I couldn't find an answer. Here are the options again:\n\n" + this.getOptionMenu();
//                     this.conversationHistory.push({ role: "assistant", content: errorMessage });
//                     return res.json({ response: errorMessage });
//                 }

//                 this.conversationHistory.push({ role: "assistant", content: responseText });
//                 return res.json({ response: responseText });
//             }
//         } catch (error) {
//             console.error("Error in chatbot handler:", error);
//             res.status(500).json({ error: error.message || "Internal Server Error" });
//         }
//     }
async chat(req, res) {
    try {
        const { fileTitle, courseId } = req.body;
        const knowledgeBase = await this.loadKnowledgeBase(fileTitle);
        const coursePrompts = await this.getPrompts(courseId);

        // Send intro message automatically on first interaction
        if (!this.hasSentIntro) {
            this.hasSentIntro = true;
            const welcomeMessage = `Hi, I am Nova, your course bot to help you navigate this course. ${this.getOptionMenu(coursePrompts)}`;
            this.conversationHistory.push({ role: "assistant", content: welcomeMessage });
            return res.json({ response: welcomeMessage });
        }

        const message = req.body.msg ? req.body.msg.trim() : "";
        console.log("Received message:", message);

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        // Handle prompt selection dynamically based on user's input
        const promptIndex = parseInt(message) - 1;  // Convert user input to zero-indexed number

        if (promptIndex >= 0 && promptIndex < coursePrompts.length) {
            // Get the selected prompt
            const selectedPrompt = coursePrompts[promptIndex];

            // Generate the response by passing the selected prompt and knowledge base
            const responseText = await this.generateChatbotResponse(selectedPrompt.description, knowledgeBase);

            // Store the conversation history
            this.conversationHistory.push({ role: "assistant", content: responseText });

            // Send the generated response to the user
            return res.json({ response: responseText });
        } else if (message === `${coursePrompts.length + 1}`) {
            // Option to show the menu again
            const updatedMenu = this.getOptionMenu(coursePrompts);
            this.conversationHistory.push({ role: "assistant", content: updatedMenu });
            return res.json({ response: updatedMenu });
        } else {
            // Handle invalid user input
            const errorMessage = `Sorry, I didn't understand that. Here are the options again:\n\n${this.getOptionMenu(coursePrompts)}`;
            this.conversationHistory.push({ role: "assistant", content: errorMessage });
            return res.json({ response: errorMessage });
        }
    } catch (error) {
        console.error("Error in chatbot handler:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
}

}

module.exports = ChatbotHandler;

