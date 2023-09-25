import { Api } from "../configs/api";
import { INote } from "../models/notes";

class NotesApi {
    async getAllNotes(userId: string) {
        const response = await Api.get<INote[]>(`/api/notes?userId=${userId}`);
        return response;
    }

    async removeNote(noteId: number, { signal }: AbortController) {
        await Api.delete(`/api/notes/${noteId}`, { signal });
    }
}

export const notesApi = new NotesApi();
