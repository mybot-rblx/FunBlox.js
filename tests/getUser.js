const bloxfun = require("../");

module.exports = async function () {
    return {
        usernameMethod: await bloxfun.getUser.byUsername("joshuadl12", "username"),
        idMethod: await bloxfun.getUser.byID(156711358, "id")
    }
}