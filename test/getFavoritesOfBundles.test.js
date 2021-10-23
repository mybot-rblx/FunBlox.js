const hello = require("../dist")

describe("FunBlox", () => {
    describe("#getUserBundles", () => {
        it("should return number of favorites", function (){
            return hello.getFavoritesOfBundle(589)
        })
    })
})