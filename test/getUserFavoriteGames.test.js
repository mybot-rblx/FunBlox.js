const { doesNotMatch } = require("assert");
const bloxfun = require("../dist");

describe("FunBlox", () => {
    describe("#getUserFavpr", () => {
        it("should return the user data via name", function (){
            return bloxfun.getUser("joshuadl12")
        })

        it("should return the user data via id", function () {
            return bloxfun.getUser(156711358)
        })
    })
})