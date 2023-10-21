import { useEffect } from "react";
import classNames from "classnames/bind";

import styles from "../style.module.css";

import { LoginForm } from "../../../../components/ordinary/Authorization/Login";

const cx = classNames.bind(styles);

function Login() {
    useEffect(() => {
        document.title = "Noteo - Вход";
    }, []);

    return (
        <div className={cx("formContainer")}>
            <LoginForm />
        </div>
    );
}

export default Login;
