import { useEffect } from "react";

import { BackButton } from "../../../components/ui/BackButton";
import { CreateNoteForm } from "../../../components/ordinary/CreateNote";

const CreateNote = () => {
    useEffect(() => {
        document.title = "Noteo - Создание заметки";
    }, []);

    return (
        <main className="create">
            <BackButton />
            <CreateNoteForm />
        </main>
    );
};

export default CreateNote;
