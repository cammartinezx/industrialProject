import React, { useState } from "react";
import Header from "../Header";
import styles from "../styles/ConversationPage.module.css";

const ConversationPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;
        
        const userMessage = { sender: "user", text: input };
        setMessages([...messages, userMessage]);
        setInput("");

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input })
            });
            
            const data = await response.json();
            const aiMessage = { sender: "ai", text: data.reply };
            setMessages([...messages, userMessage, aiMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.chatContainer}>
                <div className={styles.messages}>
                    {messages.map((msg, index) => (
                        <div key={index} className={msg.sender === "user" ? styles.userMessage : styles.aiMessage}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div className={styles.inputContainer}>
                    <input 
                        type="text" 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder="Type a message..." 
                        className={styles.input}
                    />
                    <button onClick={sendMessage} className={styles.sendButton}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default ConversationPage;
