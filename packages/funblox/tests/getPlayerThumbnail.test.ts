import { getPlayerThumbnail } from '../';

describe('FunBlox', () => {
  describe('#getPlayerThumbnail', () => {
    it('should return user photo', async function () {
      const data = await getPlayerThumbnail('156711358', '30x30', 'png', true);
      expect(data).toBeInstanceOf(Object);
    });
  });
});
