import cors from "cors";
import express, { Express } from "express";

// notes
import allNotes from "./notes/allNotes";
import soloNotes from "./notes/soloNotes";

// auth
import registration from "./authentication/registration";
import login from "./authentication/login";

const Cors = cors({ origin: "http://localhost:3000" });

export default function (app: Express) {
    app.use(Cors);
    app.use(express.json());

    // notes
    allNotes(app);
    soloNotes(app);

    // auth
    registration(app);
    login(app);
}
