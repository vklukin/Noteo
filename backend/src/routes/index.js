const cors = require("cors")

//notes
const getRequest = require("./Notes_Manipulation/get")
const postRequest = require("./Notes_Manipulation/post")
const removeNote = require("./Notes_Manipulation/removeNote")
const getNoteOnId = require("./Notes_Manipulation/getNoteOnId")
const putUpdateNote = require("./Notes_Manipulation/putUpdateNote")

//users
const postRegistr = require("./Auth_and_registr/postRegistr")
const postLogin = require("./Auth_and_registr/postLogin")
const getUsers = require("./Auth_and_registr/getUsers")

module.exports = function (app) {
    app.use(cors())

    //notes
    getRequest(app)
    postRequest(app)
    removeNote(app)
    getNoteOnId(app)
    putUpdateNote(app)

    //  users
    postRegistr(app)
    postLogin(app)
    getUsers(app)
}
