/* eslint-disable max-len */
import { mobileAPI } from '../api';
import tough from 'tough-cookie';
import cookieJar from './jar';

/**
 * Get the current user's data. (Utility only)
 * @param {string} jar
* @return {Promise<Object>}
 */
export default function getCurrentUser(jar?: string) {
  return new Promise(async function(resolve, reject) {
    switch (jar) {
      case jar:
        const Cookie = tough.Cookie;
        const bruh = Cookie.parse('.ROBLOSECURITY');
        bruh.value = jar;
        cookieJar.setCookie(bruh, '*', async (err: boolean) => {
          switch (err) {
            case true:
              reject(err);
              break;
            default:
              const resA = await mobileAPI.get('userinfo', {
                cookieJar,
              });
              if (resA.statusCode !== 200) {
                reject(new Error('You are not logged in!'));
              }
              resolve(resA.body);
          }
        });
        break;
      default:
        const resB = await mobileAPI.get('userinfo', {
          cookieJar,
        });
        if (resB.statusCode !== 200) {
          reject(new Error('You are not logged in!'));
        }
        resolve(resB.body);
        break;
    }
  });
}
