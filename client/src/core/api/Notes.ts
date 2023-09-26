import { Api } from "../configs/api";
import { IDataForCreateNote, INote } from "../models/notes";

class NotesApi {
    async getAllNotes(userId: string, { signal }: AbortController) {
        const response = await Api.get<INote[]>(`/api/notes?userId=${userId}`, {
            signal
        });
        return response;
    }

    async removeNote(noteId: number, { signal }: AbortController) {
        await Api.delete(`/api/notes/${noteId}`, { signal });
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
