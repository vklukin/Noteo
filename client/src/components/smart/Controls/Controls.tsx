import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./style.module.css";
import { ReactComponent as NewNote } from "../../../assets/images/mainpage/icons/newNote.svg";
import { ReactComponent as Plus } from "../../../assets/images/mainpage/icons/plus.svg";
import { useAuth } from "../../../core/hooks/useAuth";

const cx = classNames.bind(styles);

export const Controls = () => {
    const { user } = useAuth();

    return (
        <div className={cx("controls")}>
            <Link to={`/${user?.id}/note/create`} className={cx("link")}>
                <button className={cx("createNoteButton")}>
                    <NewNote />
                    <p>Новая заметка</p>
                    <Plus />
                </button>
            </Link>
        </div>
    );
};
