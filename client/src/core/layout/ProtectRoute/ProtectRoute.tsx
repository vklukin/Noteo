import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

export const ProtectRoute = () => {
    const { user } = useAuth();

    if (!user || user === null) {
        return <Navigate replace to="/" />;
    }

    return <Outlet />;
};
