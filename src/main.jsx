import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext.jsx';
import { ModelProvider } from './context/ModelContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ModelProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </ModelProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
