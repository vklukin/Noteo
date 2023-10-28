import React, { useEffect } from "react";
import classNames from "classnames/bind";

import styles from "./style.module.css";
import { useAuth } from "../../hooks/useAuth";
import { usePersistNavigate } from "../../hooks/usePersistNavigate";

const cx = classNames.bind(styles);

interface Props {
    children: React.ReactNode;
}

export const AuthLayout: React.FC<Props> = ({ children }) => {
    const { user } = useAuth();
    const navigate = usePersistNavigate();

    useEffect(() => {
        if (user) {
            navigate(`/${user.id}/notes`, { replace: true });
        }
    }, [navigate, user]);

    return <div className={cx("formContainer")}>{children}</div>;
};
