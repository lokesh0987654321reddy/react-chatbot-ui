import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import LoginPage from "./components/LoginPage";
import Chatbot from './components/Chatbot';
import LandingPage from './components/LandingPage';
import Sidebar from './components/Sidebar';
import SettingsPage from './components/SettingsPage';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/' || location.pathname === '/login';
  return (
    <div className={isLoginPage ? "min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100" : "min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex"}>
      {!isLoginPage && <Sidebar />}
      <main className={isLoginPage ? "flex items-center justify-center h-screen w-full" : "flex-1 h-screen p-8 overflow-auto flex flex-col"}>
        <Routes>
          <Route path="/" element={<LoginPageWithNav />} />
          <Route path="/login" element={<LoginPageWithNav />} />
          <Route path="/landing" element={<LandingPageWithNav />} />
          <Route path="/chat" element={<Chatbot />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}


function LandingPageWithNav() {
  const navigate = useNavigate();
  return <LandingPage onStart={() => navigate('/chat')} />;
}

function LoginPageWithNav() {
  const navigate = useNavigate();
  return <LoginPage onLogin={() => navigate('/landing')} />;
}

export default App
