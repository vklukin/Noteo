import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { ValidateEmail } from "../controllers/auth/ValidateEmail";
import { Registration } from "../controllers/auth/Registration";
import { ClearClassPasswordInput } from "../controllers/auth/clearClassPasswordInput";

function Login() {
    const [email, setEmail] = useState("");
    const [firstPassword, setFirstPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");

    const emailRef = useRef();
    const buttonRef = useRef();
    const firstPasswordRef = useRef();
    const secondPasswordRef = useRef();

    useEffect(() => {
        document.title = "Noteo - Регистрация";
    }, []);

    function handleFormSubmit(e) {
        e.preventDefault();

        if (
            email.trim().length !== 0 &&
            firstPassword.trim().length !== 0 &&
            secondPassword.trim().length !== 0
        ) {
            if (
                firstPassword.trim().length <= 6 ||
                secondPassword.trim().length <= 6
            ) {
                firstPasswordRef.current.classList.add("error-input");
                secondPasswordRef.current.classList.add("error-input");

                toast.error("Пароль должен быть не менее 7 символов", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light"
                });
            } else {
                if (firstPassword === secondPassword) {
                    Registration({ email: email, password: firstPassword });
                } else {
                    firstPasswordRef.current.classList.add("error-input");
                    secondPasswordRef.current.classList.add("error-input");

                    toast.error("Пароли не совпадают", {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: "light"
                    });
                }
            }
        } else {
            toast.error("Пожалуйста, заполните правильно форму!", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light"
            });
        }
    }

    return (
        <main className="loginPage">
            <form onSubmit={handleFormSubmit}>
                <h1>Регистрация</h1>
                <div className="inputs">
                    <div className="input-wrapper">
                        <label htmlFor="email" className="labelRed">
                            Почта
                        </label>
                        <input
                            type="text"
                            placeholder="Введите почту"
                            value={email}
                            id="email"
                            className="input input-email"
                            required
                            autoComplete="off"
                            ref={emailRef}
                            onChange={(e) => setEmail(e.target.value)}
                            onInput={() =>
                                ValidateEmail(
                                    email,
                                    emailRef.current,
                                    buttonRef.current
                                )
                            }
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password" className="labelRed">
                            Пароль
                        </label>
                        <input
                            type="password"
                            placeholder="Введите пароль"
                            value={firstPassword}
                            id="password"
                            ref={firstPasswordRef}
                            required
                            className="input input-password"
                            onChange={(e) => setFirstPassword(e.target.value)}
                            onInput={() =>
                                ClearClassPasswordInput(
                                    firstPasswordRef.current
                                )
                            }
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password" className="labelRed">
                            Повторите пароль
                        </label>
                        <input
                            type="password"
                            placeholder="Повторите пароль"
                            value={secondPassword}
                            ref={secondPasswordRef}
                            required
                            id="password"
                            className="input input-password"
                            onChange={(e) => setSecondPassword(e.target.value)}
                            onInput={() =>
                                ClearClassPasswordInput(
                                    secondPasswordRef.current
                                )
                            }
                        />
                    </div>
                </div>
                <div className="controllers">
                    <a href="/login">Войти</a>
                    <button type="submit" ref={buttonRef} disabled>
                        Зарегистрироваться
                    </button>
                </div>
            </form>
            <p id="message"></p>
        </main>
    );
}

export default Login;
