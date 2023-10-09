import { Op } from "sequelize";

import Notes from "../db/models/Notes";
import User from "../db/models/User";
import { ISoloNoteRequestData } from "../types/notes";

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
}
