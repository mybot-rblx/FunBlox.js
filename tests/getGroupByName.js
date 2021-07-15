const hello = require("../index")

module.exports = async function() {
    return await hello.getGroup("Target Store", "name")
}