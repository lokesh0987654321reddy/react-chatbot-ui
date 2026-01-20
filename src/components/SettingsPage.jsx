import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(ThemeContext);
  const [fontSize, setFontSize] = useState("medium");
  const [bubbleStyle, setBubbleStyle] = useState("round");
  const [model, setModel] = useState("gpt-3.5");

  const handleLogout = () => {
    navigate("/login");
  }

  return (
  <div className="w-full h-full bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl flex flex-col font-sans border border-blue-200 dark:border-gray-800 justify-center mx-auto">
      <div className="flex-1 p-8 flex flex-col items-center justify-center min-h-[240px]">
        <h2 className="text-3xl font-extrabold mb-8 text-blue-700 dark:text-white text-center drop-shadow">⚙️ Settings</h2>
        <div className="space-y-8 w-full max-w-md">
          <div>
            <label className="font-semibold text-blue-700 dark:text-white block mb-2">Theme</label>
            <select value={theme} onChange={e => setTheme(e.target.value)} className="w-full px-4 py-3 border border-blue-300 dark:border-gray-700 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-900 dark:text-white shadow-sm">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          <div>
            <label className="font-semibold text-blue-700 dark:text-white block mb-2">Font Size</label>
            <select value={fontSize} onChange={e => setFontSize(e.target.value)} className="w-full px-4 py-3 border border-blue-300 dark:border-gray-700 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-900 dark:text-white shadow-sm">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div>
            <label className="font-semibold text-blue-700 dark:text-white block mb-2">Chat Bubble Style</label>
            <select value={bubbleStyle} onChange={e => setBubbleStyle(e.target.value)} className="w-full px-4 py-3 border border-blue-300 dark:border-gray-700 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-900 dark:text-white shadow-sm">
              <option value="round">Round</option>
              <option value="square">Square</option>
              <option value="compact">Compact</option>
            </select>
          </div>
          <div>
            <label className="font-semibold text-blue-700 dark:text-white block mb-2">Model Selection</label>
            <select value={model} onChange={e => setModel(e.target.value)} className="w-full px-4 py-3 border border-blue-300 dark:border-gray-700 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-900 dark:text-white shadow-sm">
              <option value="gpt-3.5">GPT-3.5</option>
              <option value="gpt-4">GPT-4</option>
              <option value="llama">Llama</option>
              <option value="gemini">Gemini</option>
            </select>
          </div>
          <div className="text-center">
            <button onClick={handleLogout} className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-700 to-blue-400 text-white font-bold text-lg shadow-lg hover:shadow-blue-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
