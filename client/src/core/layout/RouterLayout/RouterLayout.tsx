import classNames from "classnames/bind";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import styles from "./style.module.css";

const cx = classNames.bind(styles);

export const RouterLayout = () => {
    return (
        <div className={cx("block__wrapper")}>
            <Suspense fallback="Loading...">
                <Outlet />
            </Suspense>
        </div>
    );
};
