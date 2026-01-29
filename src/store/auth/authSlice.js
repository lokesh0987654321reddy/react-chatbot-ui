import { createSlice } from "@reduxjs/toolkit";
import { checkAuthThunk } from "./authThunks";

const initialState = {
    user: null,
    loading: true,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuth: (state) => {
      state.user = null;
    },
    },
    extraReducers: (builder) => {
        builder
            // 🔁 Check auth on refresh
            .addCase(checkAuthThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuthThunk.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(checkAuthThunk.rejected, (state) => {
                state.user = null;
                state.loading = false;
            })
    },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
