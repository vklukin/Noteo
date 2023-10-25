import classNames from "classnames/bind";

import styles from "./style.module.css";
import { ReactComponent as Logo } from "../../../assets/images/Logo.svg";
import { useAuth } from "../../../core/hooks/useAuth";

const cx = classNames.bind(styles);

export const Header = () => {
    const { user } = useAuth();

    return (
        <header className={cx("header")}>
            <a
                href={user?.id ? `/${user.id}/notes` : "/"}
                className={cx("appName")}
            >
                <Logo />
                <p>Noteo</p>
            </a>
        </header>
    );
};
