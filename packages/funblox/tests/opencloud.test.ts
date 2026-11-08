import { OpenCloudClient, opencloud, setOpenCloudKey } from '../src/opencloud';
import { DualModeOptions } from '../src/utils/requestOptions';

describe('Open Cloud', () => {
  describe('OpenCloudClient', () => {
    it('should create a client with API key', () => {
      const client = new OpenCloudClient({ apiKey: 'test-key' });
      expect(client).toBeInstanceOf(OpenCloudClient);
    });

    it('should create a client with access token', () => {
      const client = new OpenCloudClient({ accessToken: 'bearer-token' });
      expect(client).toBeInstanceOf(OpenCloudClient);
    });

    it('should allow chaining setApiKey', () => {
      const client = new OpenCloudClient();
      const result = client.setApiKey('new-key');
      expect(result).toBe(client);
    });

    it('should expose group methods', () => {
      const client = new OpenCloudClient({ apiKey: 'k' });
      expect(typeof client.getGroup).toBe('function');
      expect(typeof client.listGroupRoles).toBe('function');
      expect(typeof client.assignRole).toBe('function');
      expect(typeof client.setRank).toBe('function');
      expect(typeof client.getUser).toBe('function');
      expect(typeof client.getUniverse).toBe('function');
    });
  });

  describe('opencloud helpers', () => {
    it('should expose dual-mode group helpers', () => {
      expect(typeof opencloud.getGroup).toBe('function');
      expect(typeof opencloud.setRank).toBe('function');
      expect(typeof opencloud.listGroupRoles).toBe('function');
      expect(typeof opencloud.assignRole).toBe('function');
      expect(typeof opencloud.getUser).toBe('function');
    });

    it('setOpenCloudKey should return the client', () => {
      const client = setOpenCloudKey('test-api-key');
      expect(client).toBeInstanceOf(OpenCloudClient);
    });
  });

  describe('DualModeOptions', () => {
    it('should accept useOpenCloud flag', () => {
      const opts: DualModeOptions = { useOpenCloud: true };
      expect(opts.useOpenCloud).toBe(true);
    });
  });
});
