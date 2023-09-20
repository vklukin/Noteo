import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../core/context/AuthContext"

const useUser = () => {
    return false
}

const ProtectedRoute = (props) => {
    const auth = useAuth()

    return auth.user.auth ? <Outlet /> : <Navigate to="login" />
}

export default ProtectedRoute
