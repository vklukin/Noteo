import { createContext, useCallback, useMemo, useState } from "react"

import { Api } from "../configs/api"
import { IUser } from "../models/user"

export interface IAuthContext {
    user: IUser | null
    login: (userObj: { email: string; password: string }) => Promise<void>
    logout: () => void
}
export const AuthContext = createContext<IAuthContext | null>(null)

export interface IAuthProviderProps {
    children: React.ReactNode
}
export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(
        JSON.parse(localStorage.getItem("auth") as string) || null
    )

    const setAuth = useCallback((userData: IUser) => {
        setUser(userData)

        localStorage.setItem("auth", JSON.stringify(userData))
    }, [])

    const login = useCallback<IAuthContext["login"]>(async (userObj) => {
        const { data } = await Api.post("/auth/login", userObj, {
            withCredentials: true
        })

        setAuth(data)
    }, [])

    const logout = useCallback<IAuthContext["logout"]>(() => {
        setUser(null)

        localStorage.removeItem("auth")
    }, [])

    const value = useMemo(() => ({ user, login, logout }), [user, login, logout])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
