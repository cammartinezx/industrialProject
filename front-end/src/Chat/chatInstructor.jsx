import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HeaderChatInstructor from "../components/Headers/HeaderChatInstructor";
import { url } from "../constants";

const ChatInstructor = () => {
  const { courseId, userId } = useParams(); // Get courseId and userId from the URL
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null); // Track the message being edited
  const [editedMessage, setEditedMessage] = useState(""); // Track the edited message text

  // Function to fetch the conversation history
  const fetchConversationHistory = async () => {
    try {
      const response = await axios.get(
        `${url}/conversation/get-instructor-conversation/${courseId}/${userId}`
      );
      const conversation = response.data.conversation || [];
      // Sort the messages by timestamp
      const sortedMessages = conversation.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
      setMessages(
        sortedMessages.map((msg) => ({
          id: msg.conversation_id, // Use conversation_id as the unique ID
          sender: msg.user_role === "student" ? "user" : "ai",
          text: msg.message,
        }))
      );
    } catch (error) {
      console.error("Error fetching conversation history:", error);
    }
  };

  // Fetch the conversation history when the component mounts
  useEffect(() => {
    fetchConversationHistory();
  }, [courseId, userId]);

  // Function to handle editing a message
  const handleEditMessage = (messageId, currentText) => {
    setEditingMessageId(messageId);
    setEditedMessage(currentText);
  };

  // Function to save the edited message
  const saveEditedMessage = async () => {
    try {
      await axios.patch(`${url}/conversation/${editingMessageId}/update-message`, {
        message: editedMessage,
        edited_by: "instructor",
        course_id: courseId,
      });

      // Update the message in the local state
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === editingMessageId ? { ...msg, text: editedMessage } : msg
        )
      );

      // Clear the editing state
      setEditingMessageId(null);
      setEditedMessage("");
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    // Add the instructor's message to the chat
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
    setIsTyping(true);

    // Simulate a delay for sending the message
    setTimeout(() => {
      setIsTyping(false);
    }, 500);
  };

  return (
    <>
      <div className="h-screen flex flex-col pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <HeaderChatInstructor />

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
              <div className="flex items-center">
                {editingMessageId === msg.id ? (
                  <div className="flex items-center w-full">
                    <input
                      type="text"
                      value={editedMessage}
                      onChange={(e) => setEditedMessage(e.target.value)}
                      className="w-full p-0 bg-transparent border-none focus:ring-0 focus:outline-none"
                      style={{
                        fontSize: 'inherit',
                        fontFamily: 'inherit',
                        lineHeight: 'inherit'
                      }}
                    />
                    <button
                      onClick={saveEditedMessage}
                      className="ml-2 px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <span>{msg.text}</span>
                    {msg.sender === "ai" && (
                      <button
                        onClick={() => handleEditMessage(msg.id, msg.text)}
                        className="ml-2 px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* ... [keep typing indicator the same] ... */}
        </div>

        {/* ... [keep input section the same] ... */}
      </div>
    </>
  );
};

export default ChatInstructor;