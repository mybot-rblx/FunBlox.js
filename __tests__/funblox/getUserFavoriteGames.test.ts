import {getUserFavoriteGames} from '../../packages/funblox';

describe('FunBlox', () => {
  describe('#getUserFavpr', () => {
    it('should return the user data via id', async function() {
      const data = await getUserFavoriteGames(156711358, 10);

      expect(data).toBeInstanceOf(Array);
    });
  });
});
