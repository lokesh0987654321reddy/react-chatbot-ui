import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch } from "react-redux";

import "./index.css";
import App from "./App.jsx";

import { ThemeProvider } from "./context/ThemeContext";
import { ChatProvider } from "./context/ChatContext.jsx";
import { ModelProvider } from "./context/ModelContext.jsx";

import { store } from "./store/store";
import { checkAuthThunk } from "./store/auth/authThunks";

function Bootstrap() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthThunk()); // 🔥 runs ONCE
  }, [dispatch]);

  return (
    <ThemeProvider>
      <ModelProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </ModelProvider>
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Bootstrap />
  </Provider>
);
