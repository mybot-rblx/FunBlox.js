const {getUserRank} = require('../packages/funblox/lib');

describe('FunBlox', () => {
  describe('#getUserRank', () => {
    it('should return the user rank data via name', function() {
      return getUserRank(2700627, 156711358);
    });

    it('should return the user rank data via id', function() {
      return getUserRank(2700627, 'joshuadl12');
    });
  });
});
