import { useEffect } from "react";

import { RegistrationForm } from "../../../../components/ordinary/Authorization/Registration";
import { AuthLayout } from "../../../../core/layout/AuthLayout";

function Registration() {
    useEffect(() => {
        document.title = "Noteo - Регистрация";
    }, []);

    return (
        <AuthLayout>
            <RegistrationForm />
        </AuthLayout>
    );
}

export default Registration;
