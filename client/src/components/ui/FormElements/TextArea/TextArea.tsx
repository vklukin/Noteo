import React from "react";
import classNames from "classnames/bind";

import styles from "../style.module.css";
import { IInputState } from "../../../../core/types/inputs";

const cx = classNames.bind(styles);

interface Props {
    value: IInputState;
    inputLabel?: string;
    placeholder?: string;
    inputId?: string;
    classNameContainer?: string;
    classNameTextarea?: string;
    hangleChangeState?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea: React.FC<Props> = ({
    value,
    hangleChangeState,
    inputId = "textarea",
    inputLabel = "Текст",
    placeholder = "Введите текст",
    classNameContainer,
    classNameTextarea
}) => {
    return (
        <div className={cx("input-wrapper", classNameContainer)}>
            <label htmlFor={inputId}>{inputLabel}</label>
            <textarea
                autoComplete="off"
                placeholder={placeholder}
                id={inputId}
                value={value.value}
                className={`input ${cx(
                    {
                        "error-input": !!value.errorText
                    },
                    classNameTextarea
                )}`}
                onChange={hangleChangeState}
            />
        </div>
    );
};
