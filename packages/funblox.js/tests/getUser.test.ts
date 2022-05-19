import { getUser } from '../';

describe('FunBlox', () => {
  describe('#getUser', () => {
    it('should return the user data via name', async () => {
      const data = await getUser('joshuadl12');
      return expect(data).toBeInstanceOf(Object);
    });

    it('should return the user data via id', async () => {
      const data = await getUser(15671158);
      return expect(data).toBeInstanceOf(Object);
    });
  });
});
