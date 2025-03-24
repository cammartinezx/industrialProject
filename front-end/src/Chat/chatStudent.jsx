

import HeaderStudent from "../components/Headers/HeaderChatStudent";

import { useState } from "react";


const ChatStudent = () => {


  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Hello! How can I help you?" },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  

  return (
    <>
      <div className="h-screen flex flex-col pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
       <HeaderChatStudent/>

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



//   return (
//     <div className={`${styles.container} ${darkMode ? styles.darkMode : ""}`}>
//       <Header />

//       {/* Toggle for light/dark mode */}
//       <div className={styles.toggleContainer}>
//         <label className={styles.switch}>
//           <input
//             type="checkbox"
//             checked={darkMode}
//             onChange={() => setDarkMode(!darkMode)}
//           />
//           <span className={styles.slider}></span>
//         </label>
//         <span className={styles.toggleLabel}>
//           {darkMode ? "Dark Mode" : "Light Mode"}
//         </span>
//       </div>

//       <div className={styles.chatContainer}>
//         <div className={styles.messages}>
//           {/* Render existing messages */}
//           {messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={
//                 msg.sender === "user" ? styles.userMessage : styles.aiMessage
//               }
//             >
//               {msg.text}
//             </div>
//           ))}

//           {/* 4) If chatbot is typing, show a typing indicator */}
//           {isTyping && (
//             <div className={styles.typingIndicator}>
//               <div className={styles.spinner} />
//               <span>Chatbot is thinking...</span>
//             </div>
//           )}
//         </div>

//         {/* Input area */}
//         <div className={styles.inputContainer}>
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Type a message..."
//             className={styles.input}
//           />
//           <button onClick={sendMessage} className={styles.sendButton}>
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
