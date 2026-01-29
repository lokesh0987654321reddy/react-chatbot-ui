import axios from "axios";

const API_BASE_URL = "http://localhost:8000";


const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 🔥 always send cookies
});

export { api, API_BASE_URL };
