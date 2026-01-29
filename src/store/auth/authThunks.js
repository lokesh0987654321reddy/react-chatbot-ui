import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";

/**
 * Check if user is already authenticated (cookie-based)
 * Calls: GET /auth/me
 */
export const checkAuthThunk = createAsyncThunk(
    "auth/checkAuth",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/auth/me");
            return response.data; // user object
        } catch (err) {
            return rejectWithValue(null);
        }
    }
);

