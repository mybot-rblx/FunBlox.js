const hello = require('../packages/funblox/lib');

describe('FunBlox', () => {
  describe('#getGroup', () => {
    it('should return the group data via name', function() {
      return hello.getGroup('Target Store');
    });

    it('should return the group data via id', function() {
      return hello.getGroup('2700627');
    });
  });
});
