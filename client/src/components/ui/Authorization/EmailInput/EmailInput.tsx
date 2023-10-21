import React from "react";
import classNames from "classnames/bind";

import styles from "../style.module.css";
import { IInputState } from "../../../../core/types/inputs";

const cx = classNames.bind(styles);

interface Props {
    email: IInputState;
    hangleChangeState?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EmailInput: React.FC<Props> = ({ email, hangleChangeState }) => {
    return (
        <div className={cx("input-wrapper")}>
            <label htmlFor="email">Почта</label>
            <input
                type="text"
                placeholder="Введите почту"
                autoComplete="off"
                id="email"
                value={email.value}
                className={`input ${cx({
                    "error-input": !!email.errorText
                })}`}
                onChange={hangleChangeState}
            />
        </div>
    );
};
