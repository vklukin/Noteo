import React, { useState } from "react";
import classNames from "classnames/bind";
import { AxiosError } from "axios";

import styles from "../style.module.css";
import { Message } from "../../../../core/utils/Message";
import { useAuth } from "../../../../core/hooks/useAuth";
import { IMessageError } from "../../../../core/models/serverResponse";
import { IInputState } from "../../../../core/types/inputs";
import { isLoginFormValid } from "./validation";

import { EmailInput } from "../../../ui/FormElements/EmailInput";
import { PasswordInput } from "../../../ui/FormElements/PasswordInput";

const cx = classNames.bind(styles);
const { error } = Message();

export const LoginForm = () => {
    const { login } = useAuth();

    const [email, setEmail] = useState<IInputState>({
        value: "",
        errorText: ""
    });
    const [password, setPassword] = useState<IInputState>({
        value: "",
        errorText: ""
    });

    const inputTypes = {
        email: setEmail,
        password: setPassword
    };
    const hangleChangeState = (inputType: keyof typeof inputTypes) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            inputTypes[inputType]({ value: event.target.value, errorText: "" });
        };
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isLoginFormValid({ email, setEmail }, { password, setPassword })) {
            return;
        }

        try {
            await login({ email: email.value, password: password.value });
        } catch (e) {
            const err = e as AxiosError<IMessageError>;
            error(err.response?.data?.message || "Произошла ошибка");
        }
    };

    return (
        <>
            <form className={cx("form")} onSubmit={handleFormSubmit}>
                <h1>Вход</h1>
                <div className={cx("inputs")}>
                    <EmailInput
                        email={email}
                        hangleChangeState={hangleChangeState("email")}
                    />
                    <PasswordInput
                        id="password"
                        password={password}
                        hangleChangeState={hangleChangeState("password")}
                    />
                </div>
                <div className={cx("controllers")}>
                    <a href="/registration">Создать аккаунт</a>
                    <button
                        type="submit"
                        disabled={
                            !email.value ||
                            !password.value ||
                            !!email.errorText ||
                            !!password.errorText
                        }
                    >
                        Войти
                    </button>
                </div>
            </form>
            <p className="errorMessage">
                {email.errorText || password.errorText || ""}
            </p>
        </>
    );
};
