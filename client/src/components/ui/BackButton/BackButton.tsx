import classNames from "classnames/bind";

import styles from "./style.module.css";
import ArrowLeft from "../../../assets/images/mainpage/icons/arrowLeft.svg";

const cx = classNames.bind(styles);

export const BackButton = () => {
    return (
        <button className={cx("back-button")}>
            <ArrowLeft />
            Назад
        </button>
    );
};
