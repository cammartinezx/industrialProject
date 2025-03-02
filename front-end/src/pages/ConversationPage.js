import React, { useState } from "react";
import Header from "../Header";
import styles from "../styles/ConversationPage.module.css";

const ConversationPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // This will track whether the chatbot is "thinking"
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // 1) Immediately add the user’s message to state
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // 2) Indicate chatbot is typing
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:3001/chatbot/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ msg: input }),
      });

      const data = await response.json();

      // The backend returns { response: "Hello there!" }
      const aiMessage = { sender: "ai", text: data.response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      // If you want to show an error message in the chat, you could do:
      // setMessages((prev) => [...prev, { sender: "ai", text: "Error occurred." }]);
    } finally {
      // 3) Turn off typing indicator
      setIsTyping(false);
    }
  };

  // Optional: Send message on Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className={`${styles.container} ${darkMode ? styles.darkMode : ""}`}>
      <Header />

      {/* Toggle for light/dark mode */}
      <div className={styles.toggleContainer}>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className={styles.slider}></span>
        </label>
        <span className={styles.toggleLabel}>
          {darkMode ? "Dark Mode" : "Light Mode"}
        </span>
      </div>

      <div className={styles.chatContainer}>
        <div className={styles.messages}>
          {/* Render existing messages */}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={
                msg.sender === "user" ? styles.userMessage : styles.aiMessage
              }
            >
              {msg.text}
            </div>
          ))}

          {/* 4) If chatbot is typing, show a typing indicator */}
          {isTyping && (
            <div className={styles.typingIndicator}>
              <div className={styles.spinner} />
              <span>Chatbot is thinking...</span>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className={styles.input}
          />
          <button onClick={sendMessage} className={styles.sendButton}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
