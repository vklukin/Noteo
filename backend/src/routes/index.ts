import cors from "cors";
import { Express } from "express";

// notes
import allNotes from "./notes/allNotes";
import soloNotes from "./notes/soloNotes";

// auth
import registration from "./authentication/registration";
import login from "./authentication/login";

const Cors = cors();

export default function (app: Express) {
    app.use(Cors);

    // notes
    allNotes(app);
    soloNotes(app);

    // auth
    registration(app);
    login(app);
}
