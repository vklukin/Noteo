import React from "react";
import classNames from "classnames/bind";

import styles from "./style.module.css";
import { INote } from "../../../core/models/notes";

import { NoteCard } from "../NoteCard";

interface RenderNotesProps {
    data: INote[];
}

const cx = classNames.bind(styles);

export const RenderNotes: React.FC<RenderNotesProps> = ({ data }) => {
    return (
        <div className={cx("container")}>
            {data &&
                data.map(({ id, content, title }) => {
                    return (
                        <NoteCard
                            key={id}
                            id={id}
                            title={title}
                            content={content}
                        />
                    );
                })}
        </div>
    );
};
