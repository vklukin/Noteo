import classNames from "classnames/bind";
import React, { Suspense } from "react";

import styles from "./style.module.css";
import { Message } from "../../utils/Message";
import { Header } from "../../../components/simple/Header";

interface IRouterLayoutProps {
    children: React.ReactNode;
}

const cx = classNames.bind(styles);
const { MessageContainer } = Message();

export const RouterLayout: React.FC<IRouterLayoutProps> = ({ children }) => {
    return (
        <div className={cx("block__wrapper")}>
            <Header />
            <MessageContainer />
            <Suspense fallback="Loading...">{children}</Suspense>
        </div>
    );
};
