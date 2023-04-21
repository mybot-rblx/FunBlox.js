/* eslint-disable no-unused-vars */
import { getUserRank } from '../';

describe('FunBlox', () => {
  describe('#getUserRank', () => {
    it('should return the user rank data via id', async function() {
      const result = await getUserRank(7, 21557);

      expect(result).toEqual({
        id: 52,
        name: 'Owner',
        rank: 255,
      });
    });

    it('should return the user rank data via name', async function() {
      const result = await getUserRank(7, 'Games');

      expect(result).toEqual({
        id: 52,
        name: 'Owner',
        rank: 255,
      });
    });
  });
});
