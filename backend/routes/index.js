const cors = require("cors");

const getRequest = require('./get')
const postRequest = require('./post')
const removeNote = require('./removeNote')


module.exports = function (app) {
    app.use(cors());

    getRequest(app)
    postRequest(app)
    removeNote(app)
}