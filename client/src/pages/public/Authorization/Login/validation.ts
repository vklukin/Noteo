import React from "react";

import { IInputState } from "../../../../core/types/inputs";
import { Validation } from "../../../../core/utils/Validation";

type ILoginFormValidationProps = (
    email: {
        email: IInputState;
        setEmail: React.Dispatch<React.SetStateAction<IInputState>>;
    },
    password: {
        password: IInputState;
        setPassword: React.Dispatch<React.SetStateAction<IInputState>>;
    }
) => boolean;

const { isTextEmpty, checkTextLength } = Validation;

export const isLoginFormValid: ILoginFormValidationProps = (
    { email, setEmail },
    { password, setPassword }
) => {
    if (isTextEmpty(email.value)) {
        setEmail((prev) => ({
            ...prev,
            errorText: "Поле почты не должно быть пустое"
        }));
        return false;
    }

    if (isTextEmpty(password.value)) {
        setPassword((prev) => ({
            ...prev,
            errorText: "Поле пароля не должно быть пустое"
        }));
        return false;
    }

    if (checkTextLength(password.value, 7)) {
        setPassword((prev) => ({
            ...prev,
            errorText: "Пароль должен быть не менее 7 символов"
        }));
        return false;
    }

    return true;
};
