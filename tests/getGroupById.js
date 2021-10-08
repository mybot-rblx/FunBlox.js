const hello = require("../")

module.exports = async function() {
    return await hello.getGroup.byID("2700627")
}