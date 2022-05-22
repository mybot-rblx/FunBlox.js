/* eslint-disable max-len */
import { generalCache } from './caches';
import cookieJar from './jar';
import { auth } from '../api';

/**
 * Get the XCSRF token. (Utility only)
 * @param {string} jar
 * @return {string}
 */
export default function getGeneralToken(): Promise<string | string[]> {
  return new Promise(async (resolve, reject) => {
    if (generalCache.has('XCSRF')) {
      return resolve(generalCache.get('XCSRF'));
    }

    const res = await auth.post('/v2/logout', {
      cookieJar,
    });

    if (res.statusCode !== 200) {
      return reject(new Error('Authentication API returned an error: ' + res.statusCode));
    }

    const csrfToken: string | string[] = res.headers['x-csrf-token'];

    if (!csrfToken) {
      return reject(new Error('Could not get XCSRF token!'));
    } else {
      generalCache.set('XCSRF', csrfToken);
      return resolve(csrfToken);
    }
  });
}
