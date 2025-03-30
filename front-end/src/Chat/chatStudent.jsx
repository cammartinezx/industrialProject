//import { useParams } from "react-router-dom";
import axios from "axios";
import HeaderChatStudent from "../components/Headers/HeaderChatStudent";
import HeaderStudent from "../components/Headers/HeaderChatStudent";

import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { url } from "../constants";
import { useLocation } from "react-router-dom";


const ChatStudent = () => {
  const { courseId, unitIndex } = useParams();
  const location = useLocation(); 
  const userId = location.state?.userId || localStorage.getItem("userId");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Function to fetch the conversation history
  const fetchConversationHistory = async () => {
    try {
      const response = await axios.get(`${url}/conversation/get-conversation/${courseId}/unit ${unitIndex}`);
      const conversation = response.data.conversation || [];
      // Sort the messages by timestamp
      const sortedMessages = conversation.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
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

  const handleDownloadPDF = () => {
        const element = document.getElementById("course-content"); // Select the part of the page to download
      
        html2pdf()
          .set({
            margin: 10,
            filename: courseId && title ? `${courseId}-${title}.pdf` : `Course-Details.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          })
          .from(element)
          .save();
      };
  

  

  return (
    <>
    <div id="course-content">
      <div
  className="fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm bg-n-8/90 backdrop-blur-sm"
>
  <div className="flex items-center justify-between px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
    {/* Left: Back Arrow */}
    <button onClick={() => window.history.back()} className="text-n-1 hover:text-color-1">
      ←
    </button>

    {/* Center: Title */}
    <h2 className="text-lg font-semibold text-n-1">{title}</h2>

    {/* Right: Download Button */}
    <button onClick={handleDownloadPDF} className="text-n-1 hover:text-color-1">
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
    </>
  );
};


 export default ChatStudent;

