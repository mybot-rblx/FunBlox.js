import { getGroupGames } from '../';

describe('FunBlox', () => {
  describe('#getGroupGames', () => {
    it('should return group\'s games', async function () {
      const data = await getGroupGames(1);
      expect(data).toBeInstanceOf(Object);
    });
  });
});
