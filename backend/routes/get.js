const db = require('../db.js')

module.exports = function (app) {
    app.get('/api/get', (req, res) => {
        const sqlGet = "SELECT * FROM notes";
        db.query(sqlGet, (err, result) => {
            res.send(result)
        })
    })
}