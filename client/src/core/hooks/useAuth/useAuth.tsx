import { useContext } from "react"

import { AuthContext } from "../../../core/context/AuthContext"

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("Auth context is null!")
    }

    return context
}
