import cors from "cors";
import { Express } from "express";

//notes
const getRequest = require("./Notes_Manipulation/get");
const postRequest = require("./Notes_Manipulation/post");
const removeNote = require("./Notes_Manipulation/removeNote");
const getNoteOnId = require("./Notes_Manipulation/getNoteOnId");
const putUpdateNote = require("./Notes_Manipulation/putUpdateNote");

//users
import Registration from "./authentication/registration";
import Login from "./authentication/login";
const getUsers = require("./Auth_and_registr/getUsers");

const Cors = cors();

export default function (app: Express) {
    app.use(Cors);

    //notes
    getRequest(app);
    postRequest(app);
    removeNote(app);
    getNoteOnId(app);
    putUpdateNote(app);

    //  users
    Registration(app);
    Login(app);
    getUsers(app);
}
