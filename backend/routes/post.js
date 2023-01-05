const db = require('../db.js')
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json()

module.exports = function (app) {
    app.post('/api/post', jsonParser, (req, res) => {
        try {
            const {title, text} = req.body;

            const sqlInsert = 'INSERT INTO notes (title, text) VALUES (?, ?)';
            db.query(sqlInsert, [title, text], (err, result) => err && console.log(err))

            res.send('Заметка добавлена')
        } catch (e) {
            throw new Error(e)
        }

    })
}