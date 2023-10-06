const db = require("../../db.js");

module.exports = function (app) {
    app.get("/api/get/:id", (req, res) => {
        try {
            const { id } = req.params;

            const sqlInsert = "SELECT * FROM notes WHERE id = ?";
            db.query(sqlInsert, [id], (err, result) => {
                err && console.log(err);

                res.send(result);
            });
        } catch (e) {
            throw new Error(e);
        }
    });
};
