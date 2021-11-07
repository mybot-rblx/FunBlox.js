const {getUserBundles} = require('../packages/funblox/lib');

describe('FunBlox', () => {
  describe('#getUserBundles', () => {
    it('should return all user bundles', function() {
      return getUserBundles('1');
    });
  });
});
