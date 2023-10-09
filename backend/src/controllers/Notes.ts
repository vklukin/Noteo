import { Op } from "sequelize";

import Notes from "../db/models/Notes";
import User from "../db/models/User";

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
}
