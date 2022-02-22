import {getFavoritesOfBundle} from '../';

describe('FunBlox', () => {
  describe('#getUserBundles', () => {
    it('should return number of favorites', function() {
      return getFavoritesOfBundle(589);
    });
  });
});
