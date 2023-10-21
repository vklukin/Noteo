import {
    Column,
    DataType,
    HasMany,
    Model,
    Not,
    PrimaryKey,
    Table,
    Unique
} from "sequelize-typescript";
import { Optional } from "sequelize";

import { EMAIL_REGEXP } from "../../constants/regExps";
import Notes from "./Notes";

interface UsersAttributes {
    user_id: string;
    email: string;
    password: string;
    author_id: string;
    createdAt: Date;
    updatedAt: Date;
}

interface UsersCreationAttributes
    extends Optional<UsersAttributes, "user_id" | "createdAt" | "updatedAt" | "author_id"> {}

@Table
export default class User extends Model<UsersAttributes, UsersCreationAttributes> {
    @Unique
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        allowNull: false,
        autoIncrement: false
    })
    declare user_id: string;

    @Not({
        args: EMAIL_REGEXP,
        msg: "Значение email введено не корректно."
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            isNull: {
                msg: "Значение email не должно быть пустое."
            }
        }
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            isNull: {
                msg: "Значение password не должно быть пустое."
            }
        }
    })
    declare password: string;

    @Column({
        type: DataType.DATE,
        defaultValue: new Date(),
        allowNull: false
    })
    declare createdAt: Date;

    @Column({
        type: DataType.DATE,
        defaultValue: null,
        allowNull: true
    })
    declare updatedAt: Date;

    @HasMany(() => Notes, "author_id")
    declare notes: Notes[];
}
