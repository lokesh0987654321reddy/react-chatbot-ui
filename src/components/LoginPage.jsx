import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { checkAuthThunk } from "../store/auth/authThunks";


// Animated gradient blob CSS
const blobStyles = `
  absolute rounded-full blur-2xl opacity-60
  animate-blob
`;

// Minimal keyframes for blob animation
const blobKeyframes = `
@keyframes blob {
  0%, 100% { transform: translateY(0) scale(1); }
  33% { transform: translateY(-40px) scale(1.1); }
  66% { transform: translateY(40px) scale(0.9); }
}
.animate-blob {
  animation: blob 8s infinite ease-in-out;
}
`;

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginUser(email, password);
      await dispatch(checkAuthThunk());
      setTimeout(() => {
        navigate("/landing", { replace: true });
      }, 100);
    } catch { }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black overflow-hidden min-h-screen w-screen">
      {/* Gradient Blobs */}
      <style>{blobKeyframes}</style>
      <div className="absolute inset-0 -z-10">
        <div className={`${blobStyles} w-80 h-80 bg-gradient-to-tr from-purple-900 via-blue-700 to-blue-400 left-[-6rem] top-[-6rem]`} />
        <div className={`${blobStyles} w-72 h-72 bg-gradient-to-br from-blue-500 via-purple-700 to-black right-[-5rem] top-1/3`} />
        <div className={`${blobStyles} w-60 h-60 bg-gradient-to-tl from-blue-400 via-purple-800 to-black left-1/2 bottom-[-4rem]`} />
      </div>
      {/* Optional simple particles */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 0.2 + Math.random() * 0.3, y: [0, 20, -20, 0] }}
            transition={{ duration: 6 + Math.random() * 4, repeat: Infinity }}
            className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          />
        ))}
      </div>
      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-md mx-auto px-4 py-8 sm:p-10 bg-white/10 dark:bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl flex flex-col items-center"
        style={{ minHeight: "400px" }}
      >
        {/* Bot Icon */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block bg-gradient-to-tr from-blue-500 via-purple-700 to-blue-400 text-white rounded-full p-4 shadow-lg text-4xl">
            🤖
          </span>
        </motion.div>
        {/* Login Form */}
        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border border-blue-700 bg-black/30 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-black/50 transition"
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border border-blue-700 bg-black/30 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-black/50 transition"
            autoComplete="current-password"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, boxShadow: "0 0 16px #3b82f6" }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-700 to-blue-400 text-white font-bold text-lg shadow-lg transition-all duration-300 hover:shadow-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ boxShadow: "0 0 8px #3b82f6" }}
          >
            Login
          </motion.button>
          <button
            type="button"
            className="w-full py-3 rounded-xl bg-white/20 text-blue-300 font-semibold text-lg shadow hover:bg-white/30 transition-all duration-200 border border-blue-700"
          >
            Continue with Google
          </button>
        </form>

        {/* Link to Signup */}
        <div className="mt-4 text-blue-300 text-sm cursor-pointer hover:underline" onClick={() => navigate("/signup")}>
          Don't have an account? Sign up
        </div>
        {/* Footer */}
        <div className="mt-8 text-xs text-blue-300 text-center">Welcome to AI ChatBot</div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
