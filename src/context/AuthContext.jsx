// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { api } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = not logged in, object = logged in
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in by calling backend
    const checkAuth = async () => {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
