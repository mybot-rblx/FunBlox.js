import {getGroup} from '../../packages/funblox';

describe('FunBlox', () => {
  describe('#getGroup', () => {
    it('should return the group data via name', function() {
      return getGroup('Target Store');
    });

    it('should return the group data via id', function() {
      return getGroup('2700627');
    });
  });
});
