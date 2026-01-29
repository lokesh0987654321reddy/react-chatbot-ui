import React, { useState, useRef, useEffect } from "react";
import { streamChatOllama, streamChatOpenRouter, saveChat, getChatMessages, updateChatTitle } from "../services/chatService";
import ModelSelector from "../components/ModelSelector";
import { useChats } from "../context/ChatContext";
import { useModels } from "../context/ModelContext";
import { motion, AnimatePresence } from "framer-motion";


const Chatbot = () => {
  const chatId = new URLSearchParams(window.location.search).get("session");

  const { activeModel } = useModels();

  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [useRag, setUseRag] = useState(false);

  const { updateChat } = useChats();

  const messagesEndRef = useRef(null);


  useEffect(() => {
    const fetchHistory = async () => {
      if (!chatId) return;
      try {
        const history = await getChatMessages(chatId);
        const formatted = history.map((msg) => ({
          text: msg.content,
          sender: msg.sender,
        }));
        setMessages(formatted);
      } catch (err) {
        console.error("Failed to fetch chat history", err);
      }
    };

    fetchHistory();
  }, [chatId]);

  const handleSend = async () => {
    const selectedModel = activeModel;
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      { text: userMessage, sender: "user" },
      { text: "", sender: "bot" }
    ]);

    setInput("");

    let botText = "";

    function generateChatTitle(text) {
      return text
        .split(" ")
        .slice(0, 5)
        .join(" ");
    }

    if (selectedModel.id === "llama3.2") {
      streamChatOllama(
        userMessage,
        chatId,
        useRag,
        (token) => {
          botText += token;
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1].text = botText;
            return updated;
          });
        },
        async () => {
          try {
            await saveChat(chatId, userMessage, botText);

            const isFirstMessage = messages.filter(msg => msg.sender === "bot").length === 1;
            if (isFirstMessage) {
              const title = generateChatTitle(userMessage);
              await updateChatTitle(chatId, title);

              updateChat(parseInt(chatId), { title });
            }
          } catch (err) {
            console.error("Failed to save chat", err);
          }
        },
        (err) => {
          console.error("Stream error", err);
        }
      );
    } else {

      streamChatOpenRouter(
        userMessage,
        chatId,
        selectedModel ? selectedModel.id : "default-model",
        useRag,
        (token) => {
          botText += token;
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1].text = botText;
            return updated;
          });
        },
        async () => {
          try {
            await saveChat(chatId, userMessage, botText);

            const isFirstMessage = messages.filter(msg => msg.sender === "bot").length === 1;
            if (isFirstMessage) {
              const title = generateChatTitle(userMessage);
              await updateChatTitle(chatId, title);

              updateChat(parseInt(chatId), { title });
            }
          } catch (err) {
            console.error("Failed to save chat", err);
          }
        },
        (err) => {
          console.error("Stream error", err);
        }
      );
    }
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

  useEffect(() => {
    if (messages.length === 0) return;

    setMessages(prev => [
      ...prev,
      {
        text: useRag
          ? "🧠 Resume Mode enabled. Answers will be based on your profile."
          : "💬 Chat Mode enabled. Free conversation activated.",
        sender: "system"
      }
    ]);
  }, [useRag]);


  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl flex flex-col font-sans border border-blue-200 dark:border-gray-800">
      <div className="
  flex items-center justify-between
  px-5 py-3
  border-b border-blue-200 dark:border-gray-700
  bg-white/80 dark:bg-gray-900/80
  backdrop-blur
  rounded-t-2xl
">
        {/* Left: Model info */}
        <div className="flex items-center gap-3 text-sm">
          <span className="px-2 py-1 rounded-full bg-blue-100 dark:bg-gray-800 text-xs">
            {activeModel?.provider === "ollama" ? "🖥 Local" : "🌐 Cloud"}
          </span>

          <span className="font-semibold text-gray-700 dark:text-gray-200 truncate max-w-[220px]">
            🧠 {activeModel?.label || "No model"}
          </span>

          {/* RAG badge */}
          {useRag ? (
            <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">
              🧠 Resume Mode
            </span>
          ) : (
            <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
              💬 Chat Mode
            </span>
          )}
        </div>

        {/* Right: Toggle + Model Selector */}
        <div className="flex items-center gap-4">
          {/* RAG Toggle */}
          <motion.div
            className="relative w-[9rem] h-9 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer flex items-center px-1"
            onClick={() => setUseRag(!useRag)}
            whileTap={{ scale: 0.95 }}
          >
            {/* Sliding pill */}
            <motion.div
              layout
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
              className={`absolute top-1 left-1 w-16 h-7 rounded-full shadow-md ${useRag
                ? "bg-green-500"
                : "bg-blue-500"
                }`}
              style={{
                x: useRag ? 64 : 0
              }}
            />

            {/* Labels */}
            <div className="relative z-10 flex w-full text-xs font-semibold">
              <span
                className={`w-1/2 text-center transition-colors ${!useRag ? "text-white" : "text-gray-600"
                  }`}
              >
                💬 Chat
              </span>
              <span
                className={`w-1/2 text-center transition-colors ${useRag ? "text-white" : "text-gray-600"
                  }`}
              >
                🧠 RAG
              </span>
            </div>
          </motion.div>


          <ModelSelector />
        </div>
      </div>
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
        {/* Typing animation for bot */}
        {typing && (
          <div className="flex items-start mb-3">
            <div className="mr-2 flex-shrink-0">
              <span className="inline-block w-8 h-8 rounded-full bg-blue-200 dark:bg-blue-900 flex items-center justify-center text-xl">🤖</span>
            </div>
            <div className="bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-200 rounded-xl p-3 text-left max-w-[80%] shadow-sm border border-blue-100 dark:border-gray-700 font-mono">
              {typing}
              <span className="animate-pulse">|</span>
            </div>
          </div>
        )}
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
