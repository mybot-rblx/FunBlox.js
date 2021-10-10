const hello = require("../dist")

describe("FunBlox", () => {
    describe("#getUserBundles", () => {
        it("should return all user bundles", function (){
            return hello.getUserBundles("1")
        })
    })
})