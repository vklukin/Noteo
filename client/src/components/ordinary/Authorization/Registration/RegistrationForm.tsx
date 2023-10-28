import { AxiosError } from "axios";
import classNames from "classnames/bind";
import React, { useState } from "react";

import styles from "../style.module.css";
import { useAuth } from "../../../../core/hooks/useAuth";
import { IMessageError } from "../../../../core/models/serverResponse";
import { IInputState } from "../../../../core/types/inputs";
import { Message } from "../../../../core/utils/Message";
import { isRegistrationValid } from "./validation";

import { EmailInput } from "../../../ui/FormElements/EmailInput";
import { PasswordInput } from "../../../ui/FormElements/PasswordInput";

const cx = classNames.bind(styles);
const { error } = Message();

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
                    <EmailInput
                        email={email}
                        hangleChangeState={handleChangeState("email")}
                    />
                    <PasswordInput
                        id="password1"
                        password={firstPassword}
                        hangleChangeState={handleChangeState("firstPassword")}
                    />
                    <PasswordInput
                        id="password2"
                        password={secondPassword}
                        hangleChangeState={handleChangeState("secondPassword")}
                    />
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
            <p className="errorMessage">
                {email.errorText ||
                    firstPassword.errorText ||
                    secondPassword.errorText ||
                    ""}
            </p>
        </>
    );
};
