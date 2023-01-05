const express = require('express')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 8000;
require('./routes/index')(app)

// app.use(express.json())


app.listen(PORT, () => {
    console.log(`Server working on ${PORT}`);
});