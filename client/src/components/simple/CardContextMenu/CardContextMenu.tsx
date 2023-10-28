import classNames from "classnames/bind";
import React from "react";

import styles from "./style.module.css";

interface ContextMenuProps {
    id: number;
    handleChangeState: (
        state: "isShowRemoveModal" | "isShowContextMenu"
    ) => () => void;
}

const cx = classNames.bind(styles);

export const CardContextMenu: React.FC<ContextMenuProps> = ({
    id,
    handleChangeState
}) => {
    return (
        <div className={cx("contextMenu")} data-context-id={id}>
            <button
                className={cx("removeButton")}
                onClick={handleChangeState("isShowRemoveModal")}
            >
                Удалить заметку
            </button>
        </div>
    );
};
