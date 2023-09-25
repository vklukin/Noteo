import { useEffect } from "react";
import classNames from "classnames/bind";

import styles from "../style.module.css";
import { RegistrationForm } from "../../../../components/ordinary/Authorization/Registration";

const cx = classNames.bind(styles);

function Registration() {
    useEffect(() => {
        document.title = "Noteo - Регистрация";
    }, []);

    return (
        <main className={cx("authContainer")}>
            <RegistrationForm />
        </main>
    );
}

export default Registration;
