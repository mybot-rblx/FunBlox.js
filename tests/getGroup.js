const hello = require("../dist")

module.exports = async function() {
    return {
        nameMethod: await hello.getGroup("Target Store"),
        idMethod: await hello.getGroup("2700627")
    }
}