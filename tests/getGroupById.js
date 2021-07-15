const hello = require("../index")

module.exports = async function() {
    return await hello.getGroup("2700627", "id")
}