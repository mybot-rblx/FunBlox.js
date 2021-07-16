const hello = require("../")

module.exports = async function() {
    return await hello.getGroupByName("Target Store", "name")
}