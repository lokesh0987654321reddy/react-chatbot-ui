import React, { useState } from "react";
import { motion } from "framer-motion";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";



// Blob styles (same as Login)
const blobStyles = `
  absolute rounded-full blur-2xl opacity-60
  animate-blob
`;

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

const SignupPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await registerUser(email, password);

            if (data.access_token) {
               navigate("/login");
            }
        } catch (err) {
            setError(err.response?.data?.detail || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black overflow-hidden min-h-screen w-screen">
            <style>{blobKeyframes}</style>

            {/* Background blobs */}
            <div className="absolute inset-0 -z-10">
                <div className={`${blobStyles} w-80 h-80 bg-gradient-to-tr from-purple-900 via-blue-700 to-blue-400 left-[-6rem] top-[-6rem]`} />
                <div className={`${blobStyles} w-72 h-72 bg-gradient-to-br from-blue-500 via-purple-700 to-black right-[-5rem] top-1/3`} />
                <div className={`${blobStyles} w-60 h-60 bg-gradient-to-tl from-blue-400 via-purple-800 to-black left-1/2 bottom-[-4rem]`} />
            </div>

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="relative w-full max-w-md px-6 py-10 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl"
            >
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <span className="bg-gradient-to-tr from-blue-500 via-purple-700 to-blue-400 text-white rounded-full p-4 text-4xl shadow-lg">
                        ✨
                    </span>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <input
                        type="email"
                        required
                        placeholder="Email"
                        className="px-5 py-3 rounded-xl border border-blue-700 bg-black/30 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        required
                        minLength={8}
                        maxLength={72}
                        placeholder="Password"
                        className="px-5 py-3 rounded-xl border border-blue-700 bg-black/30 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && (
                        <div className="text-red-400 text-sm text-center">{error}</div>
                    )}

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        disabled={loading}
                        className="py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-700 to-blue-400 text-white font-bold text-lg shadow-lg"
                    >
                        {loading ? "Creating account..." : "Sign Up"}
                    </motion.button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center text-blue-300 text-sm">
                    Already have an account?{" "}
                    <button
                        onClick={() => navigate("/login")}
                        className="text-blue-400 hover:underline"
                    >
                        Login
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default SignupPage;
