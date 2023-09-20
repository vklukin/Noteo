import { createContext, useCallback, useMemo, useState } from "react"

import { Api } from "../configs/api"
import { IUser } from "../models/user"

export interface IAuthContext {}
export const AuthContext = createContext<IAuthContext | null>(null)

export interface IAuthProviderProps {
    children: React.ReactNode
}
export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null)

    const login = useCallback<(userObj: { email: string; password: string }) => void>(
        async (userObj) => {
            const { data } = await Api.post("/auth/login", userObj, {
                withCredentials: true
            })

            setUser(data)
        },
        []
    )

    const logout = useCallback(() => {
        setUser(null)
    }, [])

    const value = useMemo(() => ({ user, login, logout }), [])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
