import React, { useState } from "react";
import classNames from "classnames/bind";
import { AxiosError } from "axios";

import styles from "../style.module.css";
import { Message } from "../../../../core/utils/Message";
import { Validation } from "../../../../core/utils/Validation";
import { useAuth } from "../../../../core/hooks/useAuth";
import { IMessageError } from "../../../../core/models/serverResponse";
import { IInputState } from "../../../../core/types/inputs";
import { isLoginFormValid } from "./validation";

const cx = classNames.bind(styles);
const { error } = Message();
const { isEmailValid } = Validation;

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
        <main className={cx("authContainer")}>
            <form className={cx("form")} onSubmit={handleFormSubmit}>
                <h1>Вход</h1>
                <div className={cx("inputs")}>
                    <div className={cx("input-wrapper")}>
                        <label htmlFor="email">Почта</label>
                        <input
                            type="text"
                            placeholder="Введите почту"
                            value={email.value}
                            id="email"
                            className={`input ${cx({
                                "error-input": !isEmailValid(email.value)
                            })}`}
                            onChange={hangleChangeState("email")}
                            autoComplete="off"
                        />
                    </div>
                    <div className={cx("input-wrapper")}>
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            placeholder="Введите пароль"
                            id="password"
                            value={password.value}
                            className={`input ${cx({
                                "error-input": !!password.errorText
                            })}`}
                            onChange={hangleChangeState("password")}
                        />
                    </div>
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
            <p className={cx("errorMessage")}>
                {email.errorText || password.errorText || ""}
            </p>
        </main>
    );
};
