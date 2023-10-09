import cors from "cors";
import { Express } from "express";

// notes
const getRequest = require("./Notes_Manipulation/get");
const postRequest = require("./Notes_Manipulation/post");
const removeNote = require("./Notes_Manipulation/removeNote");
const getNoteOnId = require("./Notes_Manipulation/getNoteOnId");
const putUpdateNote = require("./Notes_Manipulation/putUpdateNote");

// auth
import Registration from "./authentication/registration";
import Login from "./authentication/login";

const Cors = cors();

export default function (app: Express) {
    app.use(Cors);

    // notes
    getRequest(app);
    postRequest(app);
    removeNote(app);
    getNoteOnId(app);
    putUpdateNote(app);

    // auth
    Registration(app);
    Login(app);
}
