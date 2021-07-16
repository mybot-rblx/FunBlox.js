const bloxfun = require("../");

module.exports = async function () {
    return {
        usernameMethod: await bloxfun.getUser("joshuadl12", "username"),
        idMethod: await bloxfun.getUser(156711358, "id")
    }
}