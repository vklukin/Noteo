import {
    CreationOptional,
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes
} from "sequelize";

import { db } from "../../configs/db";
import { EMAIL_REGEXP } from "../../constants/regExps";

export class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User, { omit: "user_id" }>
> {
    declare user_id: number;
    declare email: string;
    declare password: string;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}
User.init(
    {
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            autoIncrement: false,
            primaryKey: true,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                not: {
                    args: EMAIL_REGEXP,
                    msg: "Значение email введено не корректно."
                },
                isNull: {
                    msg: "Значение email не должно быть пустое."
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNull: {
                    msg: "Значение password не должно быть пустое."
                }
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: null,
            allowNull: true
        }
    },
    {
        sequelize: db,
        modelName: "User"
    }
);
