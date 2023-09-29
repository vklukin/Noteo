const bodyParser = require("body-parser")
const AuthQueryDB = require("../../controllers/AuthQueryDB")
const jwt = require("jsonwebtoken")
const { secret } = require("./config")
const bcrypt = require("bcryptjs")

const jsonParser = bodyParser.json()

module.exports = function (app) {
    app.post("/auth/login", jsonParser, async (req, res) => {
        const Q = new AuthQueryDB()
        const generateAccessToken = (id) => {
            let payload = {
                id
            }
            return jwt.sign(payload, secret, { expiresIn: "7d" })
        }

        try {
            const { email, password } = req.body
            let candidate

            await Q.query(`SELECT * FROM users WHERE email = ?`, email).then((data) => {
                candidate = data[0]
            })

            if (!candidate) {
                return res.status(400).json({
                    message: "Пользователь с таким email адресом не найден"
                })
            }

            const validPassword = bcrypt.compareSync(password, candidate.password)
            if (!validPassword) {
                return res.status(400).json({
                    message: "Введен не верный пароль"
                })
            }

            const token = generateAccessToken(candidate.id)
            return res.json({ token })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: "Login error" })
        }
    })
}
