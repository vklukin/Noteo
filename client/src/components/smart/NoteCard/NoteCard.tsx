import { createPortal } from "react-dom";
import classNames from "classnames/bind";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./style.module.css";
import { ReactComponent as ThreeDots } from "../../../assets/images/mainpage/icons/threeDots.svg";
import { useAuth } from "../../../core/hooks/useAuth";

import { RemoveCardModal } from "../../simple/RemoveCardModal";
import { CardContextMenu } from "../../simple/CardContextMenu";

interface NoteProps {
    id: number;
    title: string;
    content: string;
}

const cx = classNames.bind(styles);

export const NoteCard: React.FC<NoteProps> = ({ id, content, title }) => {
    const { user } = useAuth();

    const [isShowRemoveModal, setIsShowRemoveModal] = useState<boolean>(false);
    const [isShowContextMenu, setIsShowContextMenu] = useState<boolean>(false);

    //const abortControllerRef = useRef<AbortController | null>(null);

    const listener = useCallback(
        (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (!target.closest(`div[data-context-id=${id}]`)) {
                setIsShowContextMenu(false);
            }
        },
        [id]
    );

    useEffect(() => {
        if (isShowContextMenu) {
            window.addEventListener("click", listener, true);
        }

        return () => {
            window.removeEventListener("click", listener, true);
        };
    }, [isShowContextMenu, listener]);

    // changing state
    const statesObj = {
        isShowRemoveModal: setIsShowRemoveModal,
        isShowContextMenu: setIsShowContextMenu
    };
    const handleChangeState = (state: keyof typeof statesObj) => {
        return () => {
            statesObj[state]((prev) => !prev);
        };
    };

    // query for removing note
    const handleRemoveNote = async () => {
        ///
    };

    return (
        <>
            <div className={cx("card")} data-id={id}>
                <Link
                    to={`/${user?.id ?? 0}/note/edit/${id}`}
                    className={cx("editCardButton")}
                />
                <h3>{title}</h3>
                <p>{content}</p>

                <div className={cx("cardControls")}>
                    <button
                        className={cx("contextMenuButton")}
                        onClick={handleChangeState("isShowContextMenu")}
                    >
                        <ThreeDots />
                    </button>
                </div>
                {isShowContextMenu && (
                    <CardContextMenu
                        id={id}
                        handleChangeState={handleChangeState}
                    />
                )}
            </div>
            {isShowRemoveModal &&
                createPortal(
                    <RemoveCardModal
                        handleChangeState={handleChangeState}
                        handleRemoveNote={handleRemoveNote}
                    />,
                    document.getElementById("modal") as HTMLDivElement
                )}
        </>
    );
};
