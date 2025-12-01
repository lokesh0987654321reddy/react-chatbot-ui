import React, { useState, useRef, useEffect } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim() === "" || loading) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
    setLoading(true);
    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "You said: " + input, sender: "bot" }
      ]);
      setLoading(false);
    }, 500);
  };

  // Send on Enter key
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // Scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
  <div className="w-full h-full bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl flex flex-col font-sans border border-blue-200 dark:border-gray-800">
      <div className="flex-1 p-6 overflow-y-auto min-h-[240px]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={
              msg.sender === "bot"
                ? "flex items-start mb-3"
                : "flex items-start justify-end mb-3"
            }
          >
            {msg.sender === "bot" && (
              <div className="mr-2 flex-shrink-0">
                <span className="inline-block w-8 h-8 rounded-full bg-blue-200 dark:bg-blue-900 flex items-center justify-center text-xl">🤖</span>
              </div>
            )}
            <div
              className={
                msg.sender === "bot"
                  ? "bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-200 rounded-xl p-3 text-left max-w-[80%] shadow-sm border border-blue-100 dark:border-gray-700"
                  : "bg-blue-500 dark:bg-blue-700 text-white rounded-xl p-3 text-right max-w-[80%] shadow-sm border border-blue-300 dark:border-blue-900"
              }
            >
              {msg.text}
            </div>
            {msg.sender === "user" && (
              <div className="ml-2 flex-shrink-0">
                <span className="inline-block w-8 h-8 rounded-full bg-blue-500 dark:bg-blue-700 flex items-center justify-center text-xl">🧑</span>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex border-t border-blue-200 p-4 bg-blue-50 dark:bg-gray-900 rounded-b-2xl">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border border-blue-300 dark:border-gray-700 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800 dark:text-white shadow-sm"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={input.trim() === "" || loading}
          className={`ml-3 px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-700 dark:to-blue-900 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 dark:hover:from-blue-800 dark:hover:to-blue-950 transition-colors font-semibold shadow ${input.trim() === "" || loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? (
            <span className="flex items-center"><svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>Thinking...</span>
          ) : (
            "Send"
          )}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
