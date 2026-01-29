import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { lazy, Suspense } from "react";

const LoginPage = lazy(() => import("./components/LoginPage"));
const SignupPage = lazy(() => import("./components/SignupPage"));
const LandingPage = lazy(() => import("./components/LandingPage"));
const Chatbot = lazy(() => import("./components/Chatbot"));
const SettingsPage = lazy(() => import("./components/SettingsPage"));
const Sidebar = lazy(() => import("./components/Sidebar"));

import ProtectedRoute from './components/ProtectedRoute';
import AuthGate from "./components/AuthGate";
import './App.css';

import { useDispatch } from "react-redux";

function AppContent() {
  const dispatch = useDispatch();
  const location = useLocation();


  const isLoginPage = location.pathname === '/' || location.pathname === '/login';
  return (
    <div className={isLoginPage ? "min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100" : "min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex"}>
      {!isLoginPage && (
        <Suspense fallback={null}>
          <Sidebar />
        </Suspense>
      )}
      <main className={isLoginPage ? "flex items-center justify-center h-screen w-full" : "flex-1 h-screen p-8 overflow-auto flex flex-col"}>
        <Suspense
          fallback={
            <div className="h-full flex items-center justify-center text-lg">
              Loading page...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/landing" element={<ProtectedRoute><LandingPage /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthGate >
        <AppContent />
      </AuthGate>
    </BrowserRouter>
  );
}

export default App
