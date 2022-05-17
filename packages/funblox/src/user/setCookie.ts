import { auth } from '../api';

/**
 * Set the cookie for the user
 * @param {string} cookie
 * @return {Promise<void>}
 */
export default function setCookie(cookie: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const body = await auth.post('v1/session');

    if (!cookie.toLowerCase().includes('warning:-')) {
      // eslint-disable-next-line max-len
      return reject(new TypeError('You didn\'t include the Roblox Warning. Please include the entire .ROBLOSECURITY cookie.'));
    }

    if (body.statusCode !== 200) {
      return reject(new Error('Not found. - getUser.js'));
    }

    resolve();
  });
}
