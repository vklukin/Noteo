import express from "express";
import * as dotenv from "dotenv";

import Routes from "./routes/index";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

Routes(app);

app.listen(PORT, () => {
    console.log(`Server working on ${PORT}`);
});
