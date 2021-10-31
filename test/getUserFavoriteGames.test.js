const wow = require("../dist");

describe("FunBlox", () => {
    describe("#getUserFavpr", () => {
        it("should return the user data via id", async function () {
            const data = await wow.getUserFavoriteGames(156711358)

            expect(data).toBeInstanceOf(Array);
        })
    })
})
