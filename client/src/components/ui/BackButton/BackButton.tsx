import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./style.module.css";
import { ReactComponent as ArrowLeft } from "../../../assets/images/mainpage/icons/arrowLeft.svg";
import { usePersistNavigate } from "../../../core/hooks/usePersistNavigate";
import { useAuth } from "../../../core/hooks/useAuth";

const cx = classNames.bind(styles);

export const BackButton = () => {
    const navigate = usePersistNavigate();
    const { user } = useAuth();

    const buttonClick = () => {
        navigate(-1);
    };

    return (
        <Link
            to={user?.id ? `/${user.id}/notes` : "/"}
            className={cx("back-button")}
            onClick={buttonClick}
        >
            <ArrowLeft />
            Назад
        </Link>
    );
};
