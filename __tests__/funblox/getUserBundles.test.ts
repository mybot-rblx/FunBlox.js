import {getUserBundles} from '../../packages/funblox/lib/types';

describe('FunBlox', () => {
  describe('#getUserBundles', () => {
    it('should return all user bundles', function() {
      return getUserBundles('1');
    });
  });
});
