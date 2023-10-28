import {
    Model,
    Table,
    Column,
    DataType,
    BelongsTo,
    PrimaryKey,
    Unique
} from "sequelize-typescript";
import { Optional } from "sequelize";

import User from "./User";

interface NotesAttributes {
    note_id: string;
    title: string;
    content: string;
    author_id: string;
    createdAt: Date;
    updatedAt: Date;
}

interface NotesCreationAttributes
    extends Optional<NotesAttributes, "note_id" | "createdAt" | "updatedAt"> {}

@Table
export default class Notes extends Model<NotesAttributes, NotesCreationAttributes> {
    @Unique
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        allowNull: false,
        autoIncrement: false
    })
    declare note_id: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare title: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare content: string;

    @BelongsTo(() => User, "user_id")
    @Column
    declare author_id: string;

    @Column({ type: DataType.DATE, defaultValue: new Date(), allowNull: false })
    declare createdAt: Date;

    @Column({ type: DataType.DATE, defaultValue: null, allowNull: false })
    declare updatedAt: Date;
}
