/* eslint-disable no-unused-vars */
import { getUserRank } from '../';

describe('FunBlox', () => {
  describe('#getUserRank', () => {
    it('should return the user rank data via id', async function() {
      const result = await getUserRank(2700627, 156711358);

      expect(result).toEqual({
        id: 20474600,
        name: 'Management Intern',
        rank: 237,
      });
    });

    it('should return the user rank data via name', async function() {
      const result = await getUserRank(2700627, 'joshuadl12');

      expect(result).toEqual({
        id: 20474600,
        name: 'Management Intern',
        rank: 237,
      });
    });
  });
});
