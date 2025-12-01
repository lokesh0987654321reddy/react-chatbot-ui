import React from "react";
import { Link } from "react-router-dom";

const history = [
  { id: 1, title: "Chat with AI" },
  { id: 2, title: "Study Session" },
];

const Sidebar = () => (
  <div className="w-64 bg-gradient-to-b from-blue-100 via-white to-blue-200 dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-r border-blue-200 dark:border-gray-800 h-screen flex flex-col shadow-xl">
    <div className="p-6 font-extrabold text-blue-700 dark:text-white text-2xl border-b border-blue-200 dark:border-gray-800 tracking-wide flex items-center gap-2">
      <span className="inline-block bg-blue-600 dark:bg-gray-700 text-white rounded-full px-3 py-1 text-lg mr-2 shadow">🤖</span>
      AI Chatbot
    </div>
    <nav className="flex-1 p-6 flex flex-col gap-2">
      <Link to="/" className="block py-2 px-4 rounded-lg text-blue-700 dark:text-white font-semibold hover:bg-blue-100 dark:hover:bg-gray-800 transition">🏠 Home</Link>
      <Link to="/chat" className="block py-2 px-4 rounded-lg text-blue-700 dark:text-white font-semibold hover:bg-blue-100 dark:hover:bg-gray-800 transition">💬 New Chat</Link>
      <Link to="/settings" className="block py-2 px-4 rounded-lg text-blue-700 dark:text-white font-semibold hover:bg-blue-100 dark:hover:bg-gray-800 transition">⚙️ Settings</Link>
      <div className="mt-8">
        <div className="font-bold mb-3 text-gray-700 dark:text-white text-lg">History</div>
        <div className="flex flex-col gap-2">
          {history.map(h => (
            <div key={h.id} className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg shadow px-3 py-2 text-gray-700 dark:text-white hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer transition">
              <span className="text-blue-400 dark:text-gray-400">🕑</span>
              <span>{h.title}</span>
            </div>
          ))}
        </div>
      </div>
    </nav>
  <div className="p-4 text-xs text-gray-400 dark:text-gray-500 text-center border-t border-blue-100 dark:border-gray-800">© 2025 AI Chatbot</div>
  </div>
);

export default Sidebar;
