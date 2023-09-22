import { Api } from "../configs/api";
import { INote } from "../models/notes";

class NotesApi {
    async allNotes(userId: string) {
        const response = await Api.get<INote[]>(`/api/notes?userId=${userId}`);
        return response;
    }
}

export const useNotesApi = new NotesApi();
