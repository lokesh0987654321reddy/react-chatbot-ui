import { useState, useRef, useEffect } from "react";
import { useModels } from "../context/ModelContext";

const ModelSelector = () => {
  const { models, activeModel, setActiveModel } = useModels();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!activeModel) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Active Model Chip */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          px-3 py-1 rounded-full bg-blue-600 text-white text-sm
          flex items-center gap-2 shadow
          hover:bg-blue-700 transition
          focus:outline-none
        "
      >
        🧠 {activeModel.label}
        <span
          className={`transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          ▾
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute right-0 mt-2 w-72
            bg-white dark:bg-gray-900
            rounded-xl shadow-xl
            border border-gray-200 dark:border-gray-700
            z-50
            animate-fade-in
          "
        >
          <div className="p-3 font-semibold text-gray-700 dark:text-gray-200">
            Choose Your Brain
            <div className="text-xs text-gray-500 mt-1">
              Applies to next message
            </div>
          </div>

          {models.map((model) => (
            <div
              key={model.id}
              onClick={() => {
                setActiveModel(model);
                setOpen(false);
              }}
              className={`
                px-4 py-3 cursor-pointer
                hover:bg-blue-50 dark:hover:bg-gray-800
                transition
                ${
                  activeModel.id === model.id
                    ? "bg-blue-100 dark:bg-gray-800"
                    : ""
                }
              `}
            >
              <div className="font-medium flex items-center gap-2">
                {model.provider === "ollama" ? "🖥" : "🌐"}
                {model.label}
              </div>
              <div className="text-xs text-gray-500">
                {model.description}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModelSelector;
