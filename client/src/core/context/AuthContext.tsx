import React, { createContext, useCallback, useMemo, useState } from "react";

import { Api } from "../configs/api";
import { IUser } from "../models/user";
import { usePersistNavigate } from "../hooks/usePersistNavigate";
import { Message} from "../utils/Message";
import { clearCache } from "../utils/clearCache";

export interface IAuthContext {
    user: IUser | null;
    login: (userObj: { email: string; password: string }) => Promise<void>;
    registration: (userObj: {
        email: string;
        password: string;
    }) => Promise<void>;
    logout: () => void;
}
export const AuthContext = createContext<IAuthContext | null>(null);

export interface IAuthProviderProps {
    children: React.ReactNode;
}

const { success } = Message()

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const navigate = usePersistNavigate();

    const [user, setUser] = useState<IUser | null>(
        JSON.parse(localStorage.getItem("auth") as string) || null
    );

    const setAuth = useCallback((userData: IUser) => {
        setUser(userData);

        localStorage.setItem("auth", JSON.stringify(userData));
    }, []);

    const login = useCallback<IAuthContext["login"]>(
        async (userObj) => {
            const { data } = await Api.post("/auth/login", userObj, {
                withCredentials: true
            });

            setAuth(data);
            navigate(`/${data.id}/notes`);
        },
        [navigate, setAuth]
    );

    const registration = useCallback<IAuthContext["registration"]>(
        async (userObj) => {
            await Api.post("/auth/registration", userObj);

            navigate("/");
            success("Вы успешно зарегистрировались");
        },
        [navigate]
    );

    const logout = useCallback<IAuthContext["logout"]>(() => {
        setUser(null);

        localStorage.removeItem("auth");
        clearCache();
    }, []);

    const value = useMemo(
        () => ({ user, login, registration, logout }),
        [user, login, registration, logout]
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
