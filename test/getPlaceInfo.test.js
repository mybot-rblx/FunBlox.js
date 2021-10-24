const funblox = require("../dist")

describe("FunBlox", () => {
  describe("#getPlaceInfo", () => {
    it("should return place data via id", async () => {
      const wow = await funblox.getPlaceInfo("6872265039")
      return expect(wow).toBeInstanceOf(Object)
    });
  });
});
