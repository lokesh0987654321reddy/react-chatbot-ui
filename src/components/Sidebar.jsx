import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { fetchChatHistory, createNewChat } from "../services/chatService";
import { useChats } from "../context/ChatContext.jsx";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeSessionId = new URLSearchParams(location.search).get("session");

  const { chats, addChat, loading } = useChats();

  // 🔹 Step 2: Handle clicking a history item
  const handleHistoryClick = (sessionId) => {
    navigate(`/chat?session=${sessionId}`);
  };

  // 🔹 Step 3: New chat (frontend-only for now)
  const handleNewChat = async () => {
    try {
      const chat = await createNewChat();
      addChat(chat);              // 🔥 CONTEXT UPDATE
      navigate(`/chat?session=${chat.id}`);
    } catch (err) {
      console.error("Failed to create new chat", err);
    }
  };



  return (
    <div className="w-64 bg-gradient-to-b from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-r border-blue-200 dark:border-gray-800 h-screen flex flex-col shadow-xl">

      {/* Header */}
      <div className="p-6 font-extrabold text-blue-700 dark:text-white text-2xl border-b border-blue-200 dark:border-gray-800 flex items-center gap-2">
        <span className="bg-blue-600 dark:bg-gray-700 text-white rounded-full px-3 py-1 shadow">
          🤖
        </span>
        AI Chatbot
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 flex flex-col min-h-0 overflow-hidden">
        <div className="flex flex-col gap-2">
          <Link
            to="/landing"
            className="py-2 px-4 rounded-lg font-semibold text-blue-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-800"
          >
            🏠 Home
          </Link>

          <button
            onClick={handleNewChat}
            className="text-left py-2 px-4 rounded-lg font-semibold text-blue-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-800"
          >
            💬 New Chat
          </button>

          <Link
            to="/settings"
            className="py-2 px-4 rounded-lg font-semibold text-blue-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-800"
          >
            ⚙️ Settings
          </Link>
        </div>


        {/* History Section */}
        <div className="mt-6 flex flex-col flex-1 min-h-0">
          <div className="font-bold mb-3 text-gray-700 dark:text-gray-200">
            History
          </div>


          <div
            className="
      flex flex-col gap-2
      flex-1
      overflow-y-auto
      pr-2
      scrollbar-thin
      scrollbar-thumb-blue-400
      scrollbar-track-blue-100
      dark:scrollbar-thumb-gray-600
      dark:scrollbar-track-gray-800
    "

          >
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleHistoryClick(chat.id)}
                className={`
    rounded-lg px-3 py-2 cursor-pointer transition
    ${String(chat.id) === String(activeSessionId)
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700"
                  }
  `}
              >
                <div className="flex items-center gap-2">
                  <span>🕑</span>
                  <span className="line-clamp-1 break-all">
                    {chat.title || "New Chat"}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 text-xs text-gray-400 text-center border-t dark:border-gray-800">
        © 2025 AI Chatbot
      </div>
    </div>
  );
};

export default Sidebar;
