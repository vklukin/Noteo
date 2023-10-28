import { Op } from "sequelize";

import Notes from "../db/models/Notes";
import User from "../db/models/User";
import { INote, ISoloNoteRequestData } from "../types/notes";

export class NotesController {
    static async getAllNotes(userId: string): Promise<Notes[]> {
        const res = await Notes.findAll({
            where: {
                note_id: {
                    [Op.eq]: userId
                }
            },
            order: [["createAt", "ASC"]],
            include: User
        });

        return res.length > 0 ? res : [];
    }

    static async getSoloNote({ noteId, userId }: ISoloNoteRequestData): Promise<Notes | null> {
        return await Notes.findOne({
            where: {
                note_id: {
                    [Op.eq]: noteId
                },
                author_id: {
                    [Op.eq]: userId
                }
            }
        });
    }

    static async deleteNote({ noteId, userId }: ISoloNoteRequestData) {
        const res = await Notes.destroy({
            where: {
                note_id: {
                    [Op.eq]: noteId
                },
                author_id: {
                    [Op.eq]: userId
                }
            }
        });

        return res > 0;
    }

    static async createNote(userId: string, { content, title }: Omit<INote, "id">) {
        return await Notes.create(
            {
                author_id: userId,
                content,
                title
            },
            { ignoreDuplicates: false }
        );
    }

    static async updateNote(userId: string, { content, title, id }: INote) {
        const [count] = await Notes.update(
            {
                content: content,
                title: title,
                updatedAt: new Date()
            },
            {
                where: {
                    author_id: {
                        [Op.eq]: userId
                    },
                    note_id: {
                        [Op.eq]: id
                    }
                }
            }
        );

        return count > 0;
    }
}
