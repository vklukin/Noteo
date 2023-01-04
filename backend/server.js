const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 8000;
require('./routes/get.js')(app)
// require('./routes/post.js')(app)

app.use(cors());
app.use(express.json())


app.get('/', (req, res) => {


    res.send('Hi')
})

app.listen(PORT, () => {
    console.log(`Server working on ${PORT}`);
});