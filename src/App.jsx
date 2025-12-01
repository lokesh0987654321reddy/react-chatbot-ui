import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Chatbot from './components/Chatbot';
import LandingPage from './components/LandingPage';
import Sidebar from './components/Sidebar';
import SettingsPage from './components/SettingsPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <Sidebar />
        <main className="flex-1 h-screen p-8 overflow-auto flex flex-col">
          <Routes>
            <Route path="/" element={<LandingPageWithNav />} />
            <Route path="/chat" element={<Chatbot />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

function LandingPageWithNav() {
  const navigate = useNavigate();
  return <LandingPage onStart={() => navigate('/chat')} />;
}

export default App
