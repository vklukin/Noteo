import { AxiosError } from "axios";
import classNames from "classnames/bind";
import React, { useState } from "react";

import styles from "../style.module.css";
import { useAuth } from "../../../../core/hooks/useAuth";
import { IMessageError } from "../../../../core/models/serverResponse";
import { IInputState } from "../../../../core/types/inputs";
import { Message} from "../../../../core/utils/Message";
import { Validation } from "../../../../core/utils/Validation";
import { isRegistrationValid } from "./validation";

const cx = classNames.bind(styles);
const { error } = Message()
const { isEmailValid } = Validation;

export const RegistrationForm = () => {
    const { registration } = useAuth();

    const [email, setEmail] = useState<IInputState>({
        value: "",
        errorText: ""
    });
    const [firstPassword, setFirstPassword] = useState<IInputState>({
        value: "",
        errorText: ""
    });
    const [secondPassword, setSecondPassword] = useState<IInputState>({
        value: "",
        errorText: ""
    });

    const inputTypes = {
        email: setEmail,
        firstPassword: setFirstPassword,
        secondPassword: setSecondPassword
    };
    const handleChangeState = (inputType: keyof typeof inputTypes) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            inputTypes[inputType]({ value: event.target.value, errorText: "" });
        };
    };

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            !isRegistrationValid(
                { email, setEmail },
                { firstPassword, setFirstPassword },
                { secondPassword, setSecondPassword }
            )
        ) {
            return;
        }

        try {
            await registration({
                email: email.value,
                password: firstPassword.value
            });
        } catch (e) {
            const err = e as AxiosError<IMessageError>;
            error(err.response?.data?.message || "Произошла ошибка");
        }
    };

    return (
        <>
            <form className={cx("form")} onSubmit={handleSubmitForm}>
                <h1>Регистрация</h1>
                <div className={cx("inputs")}>
                    <div className={cx("input-wrapper")}>
                        <label htmlFor="email">Почта</label>
                        <input
                            type="text"
                            placeholder="Введите почту"
                            id="email"
                            required
                            autoComplete="off"
                            value={email.value}
                            className={`input ${cx({
                                "error-input": !isEmailValid(email.value)
                            })}`}
                            onChange={handleChangeState("email")}
                        />
                    </div>
                    <div className={cx("input-wrapper")}>
                        <label htmlFor="firstPassword">Пароль</label>
                        <input
                            type="password"
                            placeholder="Введите пароль"
                            id="firstPassword"
                            required
                            value={firstPassword.value}
                            className={`input ${cx({
                                "error-input": !!firstPassword.errorText
                            })}`}
                            onChange={handleChangeState("firstPassword")}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="secondPassword">Повторите пароль</label>
                        <input
                            type="password"
                            placeholder="Повторите пароль"
                            required
                            id="secondPassword"
                            value={secondPassword.value}
                            className={`input ${cx({
                                "error-input": !!secondPassword.errorText
                            })}`}
                            onChange={handleChangeState("secondPassword")}
                        />
                    </div>
                </div>
                <div className={cx("controllers")}>
                    <a href="/">Войти</a>
                    <button
                        type="submit"
                        disabled={
                            !email.value ||
                            !firstPassword.value ||
                            !secondPassword.value ||
                            !!email.errorText ||
                            !!firstPassword.errorText ||
                            !!secondPassword.errorText
                        }
                    >
                        Зарегистрироваться
                    </button>
                </div>
            </form>
            <p id="message">
                {email.errorText ||
                    firstPassword.errorText ||
                    secondPassword.errorText ||
                    ""}
            </p>
        </>
    );
};
