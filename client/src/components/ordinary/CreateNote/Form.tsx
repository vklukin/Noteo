import React, { useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";
import classNames from "classnames/bind";

import styles from "../formsStyle.module.css";
import { IInputState } from "../../../core/types/inputs";
import { IMessageError } from "../../../core/models/serverResponse";
import { Message } from "../../../core/utils/Message";
import { usePersistNavigate } from "../../../core/hooks/usePersistNavigate";
import { useAuth } from "../../../core/hooks/useAuth";
import { notesApi } from "../../../core/api/Notes";
import { isFormOfCreationValid } from "./validation";

const cx = classNames.bind(styles);
const { error, success } =Message()
const { createNote } = notesApi;

export const CreateNoteForm = () => {
    const navigate = usePersistNavigate();
    const { user } = useAuth();

    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    const [heading, setHeading] = useState<IInputState>({
        value: "",
        errorText: ""
    });
    const [textarea, setTextarea] = useState<IInputState>({
        value: "",
        errorText: ""
    });

    // change state on input
    const states = {
        heading: setHeading,
        textarea: setTextarea
    };
    const handleChangeState = (stateType: keyof typeof states) => {
        return (
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
            states[stateType]({ value: e.target.value, errorText: "" });
        };
    };

    // create note api call
    const handleCreateNote = async () => {
        if (
            !isFormOfCreationValid(
                { heading, setHeading },
                { textarea, setTextarea }
            )
        ) {
            return;
        }

        try {
            abortControllerRef.current = new AbortController();
            await createNote(
                { heading: heading.value, content: textarea.value },
                user?.id || "0",
                abortControllerRef.current
            );

            navigate(`/${user?.id || "0"}/notes`);
            success("Заметка создана!");
        } catch (e) {
            console.error(e);

            const err = e as AxiosError<IMessageError>;
            error(err.response?.data.message || "Произошла ошибка");
        }
    };

    return (
        <form className={cx("form")} onSubmit={handleCreateNote}>
            <div className={cx("input-wrapper", "grid-input-heading")}>
                <label htmlFor="heading">Заголовок</label>
                <input
                    type="text"
                    placeholder="Введите заголовок"
                    id="heading"
                    className={cx("input")}
                    value={heading.value}
                    onChange={handleChangeState("heading")}
                />
                <p className={cx("error")}>{heading.errorText}</p>
            </div>
            <div className={cx("input-wrapper", "grid-input-textarea")}>
                <label htmlFor="textarea">Текст</label>
                <textarea
                    placeholder="Введите текст"
                    id="textarea"
                    className={cx("input")}
                    value={textarea.value}
                    onChange={handleChangeState("textarea")}
                />
                <p className={cx("error")}>{textarea.errorText}</p>
            </div>

            <button>Создать</button>
        </form>
    );
};
