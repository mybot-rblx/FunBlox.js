const { doesNotMatch } = require("assert");
const bloxfun = require("../dist");

describe("FunBlox", () => {
    describe("#getUser", () => {
        it("should return the user data via name", async function (){
            const data = await bloxfun.getUser("joshuadl12")
            return expect(data).toBeInstanceOf(Object);
        })

        it("should return the user data via id", async function () {
            const data = await bloxfun.getUser(156711358)
            return expect(data).toBeInstanceOf(Object);
        })
    })
})