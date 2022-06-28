/* eslint-disable no-unused-vars */
import { getUserRank } from '../';

describe('FunBlox', () => {
  describe('#getUserRank', () => {
    it('should return the user rank data via id', async function() {
      const result = await getUserRank(2700627, 156711358);

      expect(result).toEqual({
        id: 20441571,
        name: 'Store Supervisor',
        rank: 243,
      });
    });

    it('should return the user rank data via name', async function() {
      const result = await getUserRank(2700627, 'joshuadl12');

      expect(result).toEqual({
        id: 20441571,
        name: 'Store Supervisor',
        rank: 243,
      });
    });
  });
});
