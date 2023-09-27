import React, { useEffect } from "react";
import classNames from "classnames/bind";

import styles from "../style.module.css";

import { LoginForm } from "../../../../components/ordinary/Authorization/Login";

const cx = classNames.bind(styles);

function Login() {
    useEffect(() => {
        document.title = "Noteo - Вход";
    }, []);

    return (
        <main className={cx("authContainer")}>
            <LoginForm />
        </main>
    );
}

export default Login;
