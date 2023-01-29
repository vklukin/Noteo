const db = require("../../db.js");
const AuthQueryDB = require("../../controllers/AuthQueryDB");

module.exports = function (app) {
  app.get("/auth/users", async (req, res) => {
    const Q = new AuthQueryDB();

    try {
      const sqlGet = "SELECT * FROM users";
      await Q.query(sqlGet).then((data) => res.json(data));
    } catch (e) {
      res.send(false);
      throw new Error(e);
    }
  });
};
