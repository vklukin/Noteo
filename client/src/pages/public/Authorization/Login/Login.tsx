import { useEffect } from "react";

import { LoginForm } from "../../../../components/ordinary/Authorization/Login";
import { AuthLayout } from "../../../../core/layout/AuthLayout";

function Login() {
    useEffect(() => {
        document.title = "Noteo - Вход";
    }, []);

    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    );
}

export default Login;
