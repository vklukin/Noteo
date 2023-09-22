import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./style.module.css";
import { ReactComponent as NewNote } from "../../../assets/images/mainpage/icons/newNote.svg";
import { ReactComponent as Plus } from "../../../assets/images/mainpage/icons/plus.svg";

const cx = classNames.bind(styles);

export const Controls = () => {
    return (
        <div className={cx("controls")}>
            <Link to="/create">
                <button className={cx("createNoteButton")}>
                    <NewNote />
                    <p>Новая заметка</p>
                    <Plus />
                </button>
            </Link>
        </div>
    );
};
