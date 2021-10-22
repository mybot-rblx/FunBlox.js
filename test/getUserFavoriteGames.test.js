const { doesNotMatch } = require("assert");
const wow = require("../dist");

describe("FunBlox", () => {
    describe("#getUserFavpr", () => {
        it("should return the user data via id", function () {
            const data = await wow.getUserFavoriteGames(156711358)

            expect(data).toBeInstanceOf(Array);
        })
    })
})