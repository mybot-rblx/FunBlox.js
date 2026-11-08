import { getCategories } from '../src';

describe('FunBlox', () => {
  describe('#getCategories', () => {
    it('should return all categories', function() {
      return getCategories();
    });
  });
});
