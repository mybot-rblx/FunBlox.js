import {getFavoritesOfItem} from '../packages/funblox/lib';

describe('FunBlox', () => {
  describe('#getFavoritesOfItem', () => {
    it('should return number', function() {
      return getFavoritesOfItem(7657714208);
    });
  });
});
