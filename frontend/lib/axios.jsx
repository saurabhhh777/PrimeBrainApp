import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:7000",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});



