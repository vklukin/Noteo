const db = require("../../db.js")
const bodyParser = require("body-parser")

const jsonParser = bodyParser.json()

module.exports = function (app) {
    app.delete("/api/remove-note", jsonParser, (req, res) => {
        try {
            const { id } = req.body

            const sqlInsert = "DELETE FROM notes WHERE id = ?"
            db.query(sqlInsert, [id], (err, result) => err && console.log(err))

            return res.send(true)
        } catch (e) {
            res.send(false)
            throw new Error(e)
        }
    })
}
