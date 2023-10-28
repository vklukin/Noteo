import { useEffect } from "react";

import { BackButton } from "../../../components/ui/BackButton";
import { EditNoteForm } from "../../../components/ordinary/EditNote";

function EditNote() {
    useEffect(() => {
        document.title = "Noteo - Редактирование заметки";
    }, []);

    return (
        <main className="create">
            <BackButton />
            <EditNoteForm />
        </main>
    );
}

export default EditNote;
