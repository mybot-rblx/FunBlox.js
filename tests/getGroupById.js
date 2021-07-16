const hello = require("../")

module.exports = async function() {
    return await hello.getGroupByID("2700627", "id")
}