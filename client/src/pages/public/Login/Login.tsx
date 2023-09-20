import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"

import { useAuth } from "../../../core/hooks/useAuth"

import { ValidateEmail } from "../../../controllers/auth/ValidateEmail"
import { ClearClassPasswordInput } from "../../../controllers/auth/clearClassPasswordInput"

function Login() {
    const auth = useAuth()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const buttonRef = useRef(null)

    useEffect(() => {
        document.title = "Noteo - Вход"
    }, [])

    function handleFormSubmit(e) {
        e.preventDefault()

        if (email.trim().length !== 0 && password.trim().length !== 0) {
            if (password.trim().length <= 6) {
                passwordRef.current.classList.add("error-input")

                toast.error("Пароль должен быть не менее 7 символов", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light"
                })
            } else {
                auth.login({ email: email, password: password }).catch((e) => {
                    toast.error(e.response.data.message, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: "light"
                    })
                })
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
            })
        }
    }

    return (
        <main className="loginPage">
            <form onSubmit={handleFormSubmit}>
                <h1>Вход</h1>
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
                            ref={emailRef}
                            className="input input-email"
                            onChange={(e) => setEmail(e.target.value)}
                            onInput={() =>
                                ValidateEmail(email, emailRef.current, buttonRef.current)
                            }
                            autoComplete="off"
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password" className="labelRed">
                            Пароль
                        </label>
                        <input
                            type="password"
                            placeholder="Введите пароль"
                            value={password}
                            id="password"
                            className="input input-password"
                            ref={passwordRef}
                            onChange={(e) => setPassword(e.target.value)}
                            onInput={() => ClearClassPasswordInput(passwordRef.current)}
                        />
                    </div>
                </div>
                <div className="controllers">
                    <a href="/registration">Создать аккаунт</a>
                    <button type="submit" ref={buttonRef} disabled>
                        Войти
                    </button>
                </div>
            </form>
            <p id="message"></p>
        </main>
    )
}

export default Login
