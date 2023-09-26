import classNames from "classnames/bind";

import styles from "./style.module.css";
import ArrowLeft from "../../../assets/images/mainpage/icons/arrowLeft.svg";
import { usePersistNavigate } from "../../../core/hooks/usePersistNavigate";

const cx = classNames.bind(styles);

export const BackButton = () => {
    const navigate = usePersistNavigate();

    const buttonClick = () => {
        navigate(-1);
    };

    return (
        <button className={cx("back-button")} onClick={buttonClick}>
            <ArrowLeft />
            Назад
        </button>
    );
};
