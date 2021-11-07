import {getCategories} from '../../packages/funblox';

describe('FunBlox', () => {
  describe('#getCategories', () => {
    it('should return all categories', function() {
      return getCategories();
    });
  });
});
