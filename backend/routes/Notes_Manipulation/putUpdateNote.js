const db = require("../../db.js");
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();

module.exports = function (app) {
  app.put("/api/update-note", jsonParser, (req, res) => {
    try {
      const { title, text, id } = req.body.title;

      const sqlInsert = "UPDATE notes SET title = ?, text = ? WHERE id = ?";
      db.query(sqlInsert, [title, text, id], (err, result) => {
        err && console.log(err);
        return res.send(result);
      });
    } catch (e) {
      res.send(false);
      throw new Error(e);
    }
  });
};
