/* eslint-disable max-len */
import { generalCache } from './caches';
import cookieJar from './jar';
import { auth } from '../api';

/**
 * Get the XCSRF token. Clears cache on failure for robustness.
 * @return {Promise<string>}
 */
export default function getGeneralToken(): Promise<string> {
  return new Promise(async (resolve, reject) => {
    if (generalCache.has('XCSRF')) {
      return resolve(generalCache.get('XCSRF') as string);
    }

    try {
      const res = await auth.post('/v2/logout', {
        cookieJar,
      });

      if (res.statusCode !== 200 && res.statusCode !== 403) {
        generalCache.delete('XCSRF');
        return reject(new Error('Authentication API returned an error: ' + res.statusCode));
      }

      const csrfToken = res.headers['x-csrf-token'] as string;

      if (!csrfToken) {
        generalCache.delete('XCSRF');
        return reject(new Error('Could not get XCSRF token!'));
      }

      generalCache.set('XCSRF', csrfToken);
      return resolve(csrfToken);
    } catch (err) {
      generalCache.delete('XCSRF');
      return reject(err);
    }
  });
}
