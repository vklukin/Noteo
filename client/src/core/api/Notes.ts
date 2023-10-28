import { Api } from "../configs/api";
import { IDataForCreateNote, INote } from "../models/notes";
import { IUser } from "../models/user";

class NotesApi {
    async getAllNotes(userId: string, { signal }: AbortController) {
        const response = await Api.get<INote[]>(`/api/notes?userId=${userId}`, {
            signal
        });
        return response;
    }

    async getNote(noteId: number | string, userId: IUser["id"], { signal }) {
        const response = await Api.get<INote>(
            `/api/notes/${noteId}?userId=${userId}`,
            {
                signal
            }
        );
        return response;
    }

    async editNote(
        newNoteData: Omit<INote, "id">,
        noteId: number | string,
        userId: IUser["id"],
        { signal }
    ) {
        const response = await Api.put(
            `/api/note/${noteId}?userId=${userId}`,
            newNoteData,
            {
                signal
            }
        );
        return response;
    }

    async removeNote(
        noteId: number,
        userId: IUser["id"],
        { signal }: AbortController
    ) {
        await Api.delete(`/api/notes/${noteId}?userId=${userId}`, { signal });
    }

    async createNote(
        noteData: IDataForCreateNote,
        userId: string | number,
        { signal }: AbortController
    ) {
        await Api.post(`/api/notes?userId=${userId}`, noteData, { signal });
    }
}

export const notesApi = new NotesApi();
