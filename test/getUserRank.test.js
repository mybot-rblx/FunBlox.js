const hello = require("../dist");

describe("FunBlox", () => {
    describe("#getUserRank", () => {
        it("should return the user rank data via name", function (){
            return hello.getUserRank(2700627, 156711358)
        })

        it("should return the user rank data via id", function () {
            return hello.getUserRank(2700627, "joshuadl12")
        })
    })
})