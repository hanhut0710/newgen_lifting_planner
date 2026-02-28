import { createContext, useContext, useEffect, useState } from "react";
import { authAPI } from "../api/authAPI";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ======================
    // LOGIN
    // ======================
    const login = async (credentials) => {
        const response = await authAPI.login(credentials);

        const token = response.data.access_token;

        localStorage.setItem("token", token);

        await fetchUser();

        return response;
    };

    // ======================
    // REGISTER
    // ======================
    const register = async (userData) => {
        return await authAPI.register(userData);
    };

    // ======================
    // LOGOUT
    // ======================
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    // ======================
    // FETCH CURRENT USER
    // ======================
    const fetchUser = async () => {
        try {
            const response = await authAPI.getCurrentUser();
            setUser(response.data);
        } catch (error) {
            logout();
        }
    };

    // ======================
    // AUTO LOGIN WHEN REFRESH
    // ======================
    useEffect(() => {
        const token = localStorage.getItem("token");

        const init = async () => {
            if (token) {
                await fetchUser();
            }
            setLoading(false);
        };

        init();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout,
                isAuthenticated: !!user,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};