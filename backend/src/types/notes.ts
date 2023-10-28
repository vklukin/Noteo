export interface INote {
    id: string;
    title: string;
    content: string;
}

export interface INoteId {
    noteId: string;
}

export interface ISoloNoteRequestData {
    noteId: string;
    userId: string;
}
