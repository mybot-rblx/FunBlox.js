import { getUserBundles } from '../src';

describe('FunBlox', () => {
  describe('#getUserBundles', () => {
    it('should return all user bundles', function () {
      return getUserBundles('1');
    });
  });
});
