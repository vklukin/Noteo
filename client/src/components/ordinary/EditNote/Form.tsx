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
import { Api } from "../../../core/configs/api";

import { Spinner } from "../../simple/Spinner";
import { TextInput } from "../../ui/FormElements/TextInput";
import { TextArea } from "../../ui/FormElements/TextArea";

const cx = classNames.bind(styles);
const { error, success } = Message();
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
    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();

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
                Изменить
            </button>
        </form>
    );
};
