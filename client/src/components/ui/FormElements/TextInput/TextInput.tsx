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
    hangleChangeState?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput: React.FC<Props> = ({
    value,
    hangleChangeState,
    inputId = "text",
    inputLabel = "Заголовок",
    classNameContainer,
    classNameTextarea,
    placeholder = "Введите заголовок"
}) => {
    return (
        <div className={cx("input-wrapper", classNameContainer)}>
            <label htmlFor={inputId}>{inputLabel}</label>
            <input
                type="text"
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
