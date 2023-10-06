import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
require("./routes/index")(app);

app.listen(PORT, () => {
    console.log(`Server working on ${PORT}`);
});
