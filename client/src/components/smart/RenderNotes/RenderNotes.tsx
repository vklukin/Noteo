import React from "react";
import classNames from "classnames/bind";

import styles from "./style.module.css";
import { INote } from "../../../core/models/notes";

import ShowNotesOnBoard from "../../ShowNotesOnBoard";

interface RenderNotesProps {
    data: INote[];
}

const cx = classNames.bind(styles);

export const RenderNotes: React.FC<RenderNotesProps> = ({ data }) => {
    return (
        <div className={cx("container")}>
            {data &&
                data.map((item) => {
                    return (
                        <ShowNotesOnBoard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            text={item.content}
                        />
                    );
                })}
        </div>
    );
};
