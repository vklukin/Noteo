import { useEffect } from "react";
import classNames from "classnames/bind";

import styles from "./style.module.css";

import { BackButton } from "../../../components/ui/BackButton";
import { CreateNoteForm } from "../../../components/ordinary/CreateNote";

const cx = classNames.bind(styles);

const CreateNote = () => {
    useEffect(() => {
        document.title = "Создание заметки";
    }, []);

    return (
        <main className={cx("create")}>
            <BackButton />
            <CreateNoteForm />
        </main>
    );
};

export default CreateNote;
