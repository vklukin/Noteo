const bodyParser = require("body-parser")
const bcrypt = require("bcryptjs")
const AuthQueryDB = require("../../controllers/AuthQueryDB")

const jsonParser = bodyParser.json()

module.exports = function (app) {
    app.post("/auth/registration", jsonParser, async (req, res) => {
        const Q = new AuthQueryDB()

        try {
            const { email, password } = req.body
            let candidate

            await Q.query(`SELECT * FROM users WHERE email = ?`, email).then((data) => {
                candidate = data
            })
            if (candidate.length > 0) {
                return res.status(400).json({
                    message: "Пользователь с таким email адресом уже существует"
                })
            }

            const hashPassword = bcrypt.hashSync(password, 7)
            await Q.query(
                "INSERT INTO users (email, password) VALUES (?, ?)",
                email,
                hashPassword
            ).then(() => {
                try {
                    return res.json({
                        message: "Пользователь был успешно зарегистрирован!"
                    })
                } catch (e) {
                    e && console.error(e)
                }
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: "Registration error" })
        }
    })
}
