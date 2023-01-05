const cors = require("cors");

const getRequest = require('./get')
const postRequest = require('./post')


module.exports = function (app) {
    app.use(cors());

    getRequest(app)
    postRequest(app)
}