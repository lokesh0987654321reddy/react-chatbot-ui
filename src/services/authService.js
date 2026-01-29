import axios from "axios";
import { api } from "./api";

export const registerUser = async (email, password) => {
    const response = await api.post(`/auth/register`, {
        email,
        password,
    });
    return response.data;
};

export const loginUser = async (email, password) => {
    return await api.post(`/auth/login`, {
        email,
        password,
    });
};

export const logoutUser = async () => {
    return await api.post(`/auth/logout`);
}
