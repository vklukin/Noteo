const db = require("../db");

module.exports = class AuthQueryDB {
  query(sql, email, password) {
    return new Promise((resolve, reject) => {
      db.query(sql, [email, password], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
};
