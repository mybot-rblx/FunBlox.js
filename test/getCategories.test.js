const hello = require("../dist")

describe("FunBlox", () => {
    describe("#getCategories", () => {
        it("should return all categories", function (){
            return hello.getCategories()
        })
    })
})