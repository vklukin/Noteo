import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";

dotenv.config();

const host = process.env.HOST;
const database = process.env.MYSQL_DB_DATABASE;
const username = process.env.MYSQL_DB_USER;
const password = process.env.MYSQL_DB_PASSWORD;
const port = process.env.MYSQL_DB_PORT;

export const db = new Sequelize(database ?? "Noteo", username ?? "root", password ?? "root", {
    host: host,
    database: "mysql",
    port: +(port ?? 3306),
    timezone: "+05:00",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    models: [__dirname + "/src/db/models"]
});

(async () => {
    try {
        await db.authenticate();
        console.log("Connection to the database is successfull!");

        await db.sync({ alter: true });
    } catch (e) {
        console.log(`Bad connection to the database: ${e}`);
    }
})();
