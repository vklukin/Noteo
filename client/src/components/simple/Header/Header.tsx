import classNames from "classnames/bind";

import styles from "./style.module.css";
import { ReactComponent as Logo } from "../../../assets/images/Logo.svg";

const cx = classNames.bind(styles);

export const Header = () => {
    return (
        <header className={cx("header")}>
            <a href="/" className={cx("appName")}>
                <Logo />
                <p>Noteo</p>
            </a>
        </header>
    );
};
