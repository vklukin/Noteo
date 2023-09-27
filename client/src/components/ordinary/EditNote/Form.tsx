import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";

import styles from "../formsStyle.module.css";
import { IInputState } from "../../../core/types/inputs";
import { usePersistNavigate } from "../../../core/hooks/usePersistNavigate";
import { isFormOfEditionValid } from "./validation";
import { notesApi } from "../../../core/api/Notes";
import { Message } from "../../../core/utils/Message";
import { IMessageError } from "../../../core/models/serverResponse";
import { clearCache } from "../../../core/utils/clearCache";
import { useAuth } from "../../../core/hooks/useAuth";
import { queryKeys } from "../../../core/configs/QueryClient/queryKeys";

import { Spinner } from "../../simple/Spinner";

const cx = classNames.bind(styles);
const { error, success } = Message()
const { getNote, editNote } = notesApi;
const { SOLO_NOTE } = queryKeys;

export const EditNoteForm = () => {
    const navigate = usePersistNavigate();
    const { id } = useParams();
    const { user } = useAuth();

    const abortControllerRef = useRef<AbortController | null>(null);

    const { data, isLoading } = useQuery([SOLO_NOTE, id], () => {
        abortControllerRef.current = new AbortController();
        return getNote(id || 0, user?.id || 0, abortControllerRef.current);
    });

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

    useEffect(() => {
        if (!isLoading && data?.data) {
            setHeading({ value: data.data.title, errorText: "" });
            setTextarea({ value: data.data.content, errorText: "" });
        }
    }, [data, isLoading]);

    if (isLoading) {
        return <Spinner />;
    }

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

    // on submitting form
    const handleSubmitForm = async () => {
        if (
            !isFormOfEditionValid(
                { heading, setHeading },
                { setTextarea, textarea }
            )
        ) {
            return;
        }

        try {
            abortControllerRef.current = new AbortController();
            await editNote(
                { title: heading.value, content: textarea.value },
                id || 0,
                user?.id || 0,
                abortControllerRef.current
            );

            clearCache();
            navigate(`/${user?.id || "0"}/notes`);
            success("Заметка были изменена");
        } catch (e) {
            console.error(e);

            const err = e as AxiosError<IMessageError>;
            error(err?.response?.data.message || "Произошла ошибка");
        }
    };

    return (
        <form className={cx("form")} onSubmit={handleSubmitForm}>
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
