import React, { createContext, useState, ReactNode } from 'react';
import {clearSession, setSession} from "../utils/authUtils";

interface AuthContextType {
    user: string | null;
    token: string | null;
    login: (username: string, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    login: () => {},
    logout: () => {}
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = (username: string, token: string) => {
        setSession(username, token);
        setUser(username);
        setToken(token);
    };

    const logout = () => {
        clearSession()
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
