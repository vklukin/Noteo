import classNames from "classnames/bind";
import React from "react";

import styles from './style.module.css'

interface RemoveCardModalProps {
    handleChangeState: (
        state: "isShowRemoveModal" | "isShowContextMenu"
    ) => () => void;
    handleRemoveNote: () => void;
}

const cx = classNames.bind(styles)

export const RemoveCardModal: React.FC<RemoveCardModalProps> = ({
    handleChangeState,
    handleRemoveNote
}) => {
    return (
        <div className={cx("removeCardModal" )}>
            <div className={cx("wrapper")}>
                <p>
                    Это действие является необратимым. Хотите ли вы продолжить?
                </p>
                <div className={cx("buttonsWrapper")}>
                    <button
                        className={cx("cancel")}
                        onClick={handleChangeState("isShowRemoveModal")}
                    >
                        Отменить
                    </button>
                    <button
                        className={cx("accept")}
                        onClick={handleRemoveNote}
                    >
                        Подтвердить
                    </button>
                </div>
            </div>
        </div>
    );
};
