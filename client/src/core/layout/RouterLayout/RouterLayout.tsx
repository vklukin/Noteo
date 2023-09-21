import classNames from "classnames/bind"
import { Suspense } from "react"

import styles from "./style.module.css"
import { useMessage } from "../../hooks/useMessage"
import MainHeader from "../../../components/MainHeader"

interface IRouterLayoutProps {
    children: React.ReactNode
}

const cx = classNames.bind(styles)
const { MessageContainer } = useMessage()

export const RouterLayout: React.FC<IRouterLayoutProps> = ({ children }) => {
    return (
        <div className={cx("block__wrapper")}>
            <MainHeader />
            <MessageContainer />
            <Suspense fallback="Loading...">{children}</Suspense>
        </div>
    )
}
