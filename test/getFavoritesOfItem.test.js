const hello = require("../dist")

describe("FunBlox", () => {
    describe("#getFavoritesOfItem", () => {
        it("should return number", function (){
            return hello.getFavoritesOfItem(7657714208)
        })
    })
})