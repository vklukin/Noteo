import { AxiosError } from "axios";
import { createPortal } from "react-dom";
import classNames from "classnames/bind";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./style.module.css";
import { ReactComponent as ThreeDots } from "../../../assets/images/mainpage/icons/threeDots.svg";
import { useAuth } from "../../../core/hooks/useAuth";
import { notesApi } from "../../../core/api/Notes";
import { IMessage } from "../../../core/types/serverResponses";
import { Message } from "../../../core/utils/Message";
import { usePersistNavigate } from "../../../core/hooks/usePersistNavigate";

import { RemoveCardModal } from "../../simple/RemoveCardModal";
import { CardContextMenu } from "../../simple/CardContextMenu";
import { clearCache } from "../../../core/utils/clearCache";

interface NoteProps {
    id: number;
    title: string;
    content: string;
}

const cx = classNames.bind(styles);
const { removeNote } = notesApi;
const { error, success } = Message();

export const NoteCard: React.FC<NoteProps> = ({ id, content, title }) => {
    const { user } = useAuth();
    const navigate = usePersistNavigate();

    const [isShowRemoveModal, setIsShowRemoveModal] = useState<boolean>(false);
    const [isShowContextMenu, setIsShowContextMenu] = useState<boolean>(false);

    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    const listener = useCallback(
        (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (!target.closest(`div[data-context-id="${id}"]`)) {
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
        try {
            abortControllerRef.current = new AbortController();
            await removeNote(id, user?.id || 0, abortControllerRef.current);

            success("Заметка удалена!");
            clearCache();
            navigate(0);
        } catch (e) {
            console.error(e);

            const err = e as AxiosError<IMessage>;
            error(err.response?.data.message || "Произошла ошибка");
        }
    };

    return (
        <>
            <div className={cx("card")} data-id={id}>
                <Link
                    to={`/${user?.id ?? 0}/note/edit/${id}`}
                    className={cx("editCardButton")}
                    state={{
                        from: window.location.href
                    }}
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
