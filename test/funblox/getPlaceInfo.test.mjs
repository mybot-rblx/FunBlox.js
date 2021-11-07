const {getPlaceInfo} = require('../packages/funblox/lib');

describe('FunBlox', () => {
  describe('#getPlaceInfo', () => {
    it('should return place data via id', async () => {
      const wow = await getPlaceInfo('6872265039');
      return expect(wow).toBeInstanceOf(Object);
    });
  });
});
