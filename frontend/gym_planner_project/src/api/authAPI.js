import axiosClient from "./axiosClient";

const register = (userData) => axiosClient.post("/auth/register", userData);
const login = (credentials) => axiosClient.post("/auth/login", credentials);
const getCurrentUser = () => axiosClient.get("/auth/me");

export const authAPI = {
    register,
    login,
    getCurrentUser,
};