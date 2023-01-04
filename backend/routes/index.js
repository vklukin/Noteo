const getRequest = require('./get')
// const postRequest = require('./post')

module.exports = function (app) {
    getRequest(app)
    // postRequest(app)
}