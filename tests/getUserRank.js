const hello = require("../");

module.exports = async function() {
    return {
        idMethod: await hello.getUserRank(2700627, 156711358),
        usernameMethod: await hello.getUserRank(2700627, "joshuadl12")
    }
}