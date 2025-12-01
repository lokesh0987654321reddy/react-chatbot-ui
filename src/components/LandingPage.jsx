import React from "react";

const features = [
  { icon: "🎤", label: "Voice input" },
  { icon: "📄", label: "Document Q&A" },
  { icon: "🔒", label: "Secure" },
  { icon: "⚡", label: "Fast" },
];

const useCases = [
  "Coding help",
  "Study buddy",
  "Task assistant",
];

const LandingPage = ({ onStart }) => (
  <div className="h-full bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center px-4">
    <header className="mb-10 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 dark:text-white mb-4 drop-shadow-lg">
        Your Personal AI Assistant
      </h1>
      <button
        onClick={onStart}
        className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-700 dark:to-blue-900 text-white text-lg rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-800 dark:hover:from-blue-800 dark:hover:to-blue-950 transition-colors font-semibold"
      >
        Start Chatting →
      </button>
    </header>
    <section className="mb-8">
  <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300 mb-4 text-center">Features</h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {features.map((f) => (
          <div key={f.label} className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow p-4 w-32">
            <span className="text-3xl mb-2">{f.icon}</span>
            <span className="text-base font-medium text-gray-700 dark:text-blue-200">{f.label}</span>
          </div>
        ))}
      </div>
    </section>
    <section>
  <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300 mb-4 text-center">Use Cases</h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {useCases.map((uc) => (
          <div key={uc} className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow p-4 w-40 justify-center">
            <span className="text-base font-medium text-gray-700 dark:text-blue-200">{uc}</span>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default LandingPage;
