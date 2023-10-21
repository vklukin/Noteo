import React from "react";
import classNames from "classnames/bind";

import styles from "../style.module.css";
import { IInputState } from "../../../../core/types/inputs";

const cx = classNames.bind(styles);

interface Props {
    password: IInputState;
    hangleChangeState?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordInput: React.FC<Props> = ({
    password,
    hangleChangeState
}) => {
    return (
        <div className={cx("input-wrapper")}>
            <label htmlFor="password">Пароль</label>
            <input
                type="password"
                placeholder="Введите пароль"
                id="password"
                value={password.value}
                className={`input ${cx({
                    "error-input": !!password.errorText
                })}`}
                onChange={hangleChangeState}
            />
        </div>
    );
};
