import { getFavoritesOfBundle } from '../src';

describe('FunBlox', () => {
  describe('#getUserBundles', () => {
    it('should return number of favorites', function() {
      return getFavoritesOfBundle(589);
    });
  });
});
