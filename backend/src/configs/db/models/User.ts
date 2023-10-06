import { DataTypes, Model } from "sequelize";

import { db } from "../db";
import { EMAIL_REGEXP } from "../../../constants/regExps";

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
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
        }
    },
    {
        sequelize: db,
        modelName: "User"
    }
);
