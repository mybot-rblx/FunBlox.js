const hello = require("../dist")

describe("FunBlox", () => {
    describe("#getPlayerThumbnail", () => {
        it("should return user photo", function (){
            return hello.getPlayerThumbnail("156711358", "30x30", "png", true)
        })
    })
})