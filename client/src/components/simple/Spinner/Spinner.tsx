import classNames from "classnames/bind";

import styles from "./style.module.css";
import { ReactComponent as Logo } from "../../../assets/images/Logo.svg";

const cx = classNames.bind(styles);

export const Spinner = () => {
    return (
        <div className={cx("container")}>
            <div className={cx("spinner")}>
                <Logo />
            </div>
        </div>
    );
};
