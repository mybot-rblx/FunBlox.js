const hello = require("../")

module.exports = async function() {
    return await hello.getGroup("Target Store")
}