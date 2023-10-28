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
import { Api } from "../../../core/configs/api";

import { TextInput } from "../../ui/FormElements/TextInput";
import { TextArea } from "../../ui/FormElements/TextArea";

const cx = classNames.bind(styles);
const { error, success } = Message();
const { createNote } = notesApi;

export const CreateNoteForm = () => {
    const navigate = usePersistNavigate();
    const { user } = useAuth();

    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        const interceptorId = Api.interceptors.response.use(
            (res) => res,
            (err: AxiosError) => {
                if (err.response?.status === 404) {
                    navigate("/not_found");
                }
            }
        );

        return () => {
            abortControllerRef.current?.abort();
            Api.interceptors.response.eject(interceptorId);
        };
    }, [navigate]);

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
    const handleCreateNote = async (e: React.FormEvent) => {
        e.preventDefault();

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
            <TextInput
                value={heading}
                hangleChangeState={handleChangeState("heading")}
                classNameContainer={cx("heading")}
            />
            <TextArea
                value={textarea}
                hangleChangeState={handleChangeState("textarea")}
                classNameContainer={cx("textarea")}
            />

            <p className={`errorMessage ${cx("errorMessage")}`}>
                {heading.errorText || textarea.errorText || ""}
            </p>

            <button
                type="submit"
                className={cx("submitButton")}
                disabled={!heading.value && !textarea.value}
            >
                Создать
            </button>
        </form>
    );
};
