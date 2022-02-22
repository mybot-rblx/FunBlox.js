import {getCategories} from '../';

describe('FunBlox', () => {
  describe('#getCategories', () => {
    it('should return all categories', function() {
      return getCategories();
    });
  });
});
