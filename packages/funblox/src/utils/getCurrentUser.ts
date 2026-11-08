/* eslint-disable max-len */
import { mobileAPI } from '../api';
import { Cookie } from 'tough-cookie';
import cookieJar from './jar';

/**
 * Get the current user's data. (Utility only)
 * @param {string} jar
 * @return {Promise<Object>}
 */
export default function getCurrentUser(jar?: string): Promise<object> {
  return new Promise(async (resolve, reject) => {
    try {
      if (jar) {
        const cookie = Cookie.parse('.ROBLOSECURITY=' + jar);
        if (!cookie) {
          reject(new Error('Invalid cookie'));
          return;
        }
        await cookieJar.setCookie(cookie, 'https://roblox.com');
      }

      const res = await mobileAPI.get('userinfo', { cookieJar });
      if (res.statusCode !== 200) {
        reject(new Error('You are not logged in!'));
        return;
      }
      resolve(JSON.parse(JSON.stringify(res.body)));
    } catch (err) {
      reject(err);
    }
  });
}
