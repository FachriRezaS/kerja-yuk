"use client"
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Mock checking local storage for a session
        const storedUser = localStorage.getItem("kerja_yuk_user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user from local storage");
            }
        }
        setIsLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock authentication logic
        let authenticatedUser = null;
        
        if (email === "budi@kerja.yuk") {
            authenticatedUser = { id: 1, name: "Budi Santoso", email, role: "employee" };
        } else if (email === "manager@kerja.yuk") {
            authenticatedUser = { id: 2, name: "Manager", email, role: "manager" };
        } else if (email === "hrd@kerja.yuk") {
            authenticatedUser = { id: 3, name: "HR Director", email, role: "hrd" };
        } else {
            return { success: false, message: "Invalid credentials. Try budi@kerja.yuk, manager@kerja.yuk, or hrd@kerja.yuk" };
        }

        setUser(authenticatedUser);
        localStorage.setItem("kerja_yuk_user", JSON.stringify(authenticatedUser));
        router.push("/");
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("kerja_yuk_user");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
