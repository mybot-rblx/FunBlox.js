import {getCategories} from '../lib';

describe('FunBlox', () => {
  describe('#getCategories', () => {
    it('should return all categories', function() {
      return getCategories();
    });
  });
});
