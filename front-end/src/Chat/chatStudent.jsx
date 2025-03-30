

//import { useParams } from "react-router-dom";
import axios from "axios";
import HeaderChatStudent from "../components/Headers/HeaderChatStudent";
import HeaderStudent from "../components/Headers/HeaderChatStudent";
import html2pdf from "html2pdf.js";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { url } from "../constants";


const ChatStudent = () => {
  const { courseId, unitIndex } = useParams();
  const location = useLocation();
  const title = location.state?.title || courseId;
  const userId = location.state?.userId || localStorage.getItem("userId");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Function to fetch the conversation history
  const fetchConversationHistory = async () => {
    try {
      // const response = await axios.get(`${url}/conversation/get-conversation/${courseId}/unit ${unitIndex}`);
      // const conversation = response.data.conversation || [];
  
      const conversation = {
        "conversation": [
          {
            "user_role": "student",
            "message": "Hello, can you help me understand recursion?",
            "timestamp": "2025-03-29T10:00:00Z"
          },
          {
            "user_role": "ai",
            "message": "Sure! Recursion is when a function calls itself to solve smaller instances of a problem.",
            "timestamp": "2025-03-29T10:01:00Z"
          },
          {
            "user_role": "student",
            "message": "Can you give me an example?",
            "timestamp": "2025-03-29T10:02:00Z"
          },
          {
            "user_role": "ai",
            "message": "Of course! The classic example is the factorial function: factorial(n) = n * factorial(n-1).",
            "timestamp": "2025-03-29T10:03:00Z"
          }
        ]
      };
  
      // ✅ Fix: Sort the messages inside the "conversation" array
      const sortedMessages = conversation.conversation.sort((a, b) => 
        new Date(a.timestamp) - new Date(b.timestamp)
      );
  
      setMessages(sortedMessages.map(msg => ({
        sender: msg.user_role === "student" ? "user" : "ai",
        text: msg.message,
      })));
  
    } catch (error) {
      console.error("Error fetching conversation history:", error);
    }
  };
  
  // Fetch the conversation history when the component mounts
  useEffect(() => {
    fetchConversationHistory();
  }, [courseId, unitIndex]);

  const sendMessage = async () => {
    if (!input.trim()) return;
  
    // Add user message to the chat
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
    setIsTyping(true);
  
    try {
      // Send the message to the backend (where the chat function is handled)
      const response = await axios.post(`${url}/chatbot/ask`, {
        msg: input, // Send the user's message
      });

      // save the user message to the conversation table database
      await axios.post(`${url}/conversation/add-message`, {
        user_role: "student",
        message: input,
        unit: `unit ${unitIndex}`,
        user_id: userId,
        course_id: courseId,
      });

      // save the chatbot's response to the conversation table database
      await axios.post(`${url}/conversation/add-message`, {
        user_role: "chatbot",
        message: response.data.response || "No response",
        unit: `unit ${unitIndex}`,
        user_id: userId,
        course_id: courseId,
      });

      console.log("Message saved to conversation table");
  
      // Get the chatbot's response and update the chat
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: response.data.response || "No response" },
      ]);
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Error: Failed to communicate with chatbot." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleDownloadPDF = async () => {
    const element = document.getElementById("course-content");
  
    try {
      const pdfBlob = await html2pdf()
        .set({
          margin: 10,
          filename: courseId && title ? `${courseId}-${title}.pdf` : `Course-Details.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(element)
        .toPdf()
        .output('blob'); 
  
      // 1️⃣ Save the PDF to the device
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = pdfUrl;
      a.download = courseId && title ? `${courseId}-${title}.pdf` : `Course-Details.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(pdfUrl); // Clean up
  
      // 2️⃣ Upload the PDF to S3
      await storePDF(pdfBlob);
  
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  

  const storePDF = async (pdfBlob) => {
    try {
      if (!pdfBlob) {
        alert("No file to upload.");
        return;
      }
  
      // 🟢 Get a pre-signed URL from your backend
      const res = await axios.get(`${url}/student-s3Url`, {
        params: { 
          fileName: `${userId}/${courseId}/${title}.pdf`, 
          fileType: "application/pdf" 
        },
      });
  
      const urlS3 = res.data.urlS3?.uploadURL;
      if (!urlS3) throw new Error("Failed to get S3 upload URL");
  
      // 🟢 Upload the PDF to S3
      console.log("Uploading PDF to S3...");
      const uploadResponse = await axios.put(urlS3, pdfBlob, {
        headers: { "Content-Type": "application/pdf" }
      });
  
      if (uploadResponse.status === 200) {
        console.log("PDF uploaded successfully!");
  
        // 🟢 Get the final S3 file URL
        const fileUrl = urlS3.split("?")[0];
        console.log("Final S3 URL:", fileUrl);
  
        alert("PDF uploaded to S3 successfully!");
      } else {
        throw new Error("S3 upload failed");
      }
  
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload PDF.");
    }
  };
  
  

  return (
    <>
      <div id="course-content">
      <div className="h-screen flex flex-col pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
    
      <div
  className="fixed top-3 left-2 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm bg-n-8/90 backdrop-blur-sm"
>
  <div className="flex items-center justify-between px-5 lg:px-7.5 xl:px-10 max-lg:py-2 h-16">
    {/* Left: Back Arrow */}
    <button onClick={() => window.history.back()} className="text-n-1 hover:text-color-1">
      ←
    </button>

    {/* Center: Title */}
    <h2 className="text-lg font-code text-2xl uppercase text-n-1 flex-grow text-center md:py-8 lg:-mr-0.25 lg:text-s lg:font-semibold">
      {title}
    </h2>

    {/* Right: Download Button */}
    <button onClick={handleDownloadPDF} className="text-n-1 font-code text-2xl uppercase hover:text-color-1 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold">
      Download
    </button>
  </div>
</div>



        {/* Chat messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg max-w-[40%] mb-8 ${
                msg.sender === "user"
                  ? "bg-n-12 text-white self-end ml-auto"
                  : "bg-n-3 text-black self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center text-gray-500 italic">
              <div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full mr-2"></div>
              Chatbot is thinking...
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-10 flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3  rounded-lg focus:outline-none dark:bg-n-12 dark:border-gray-600 dark:text-white"
          />
          <button
            onClick={sendMessage}
            className="ml-2 px-9 py-3 bg-n-12 text-white rounded-lg  hover:bg-n-4"
          >
            Send
          </button>
        </div>
      </div>
      </div>
    </>
  );
};


 export default ChatStudent;