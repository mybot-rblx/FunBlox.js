import getCurrentUser from '../utils/getCurrentUser';

interface LoggedInUserData {
    UserID: number
    UserName: string
    RobuxBalance: number
    ThumbnailUrl: string
    IsAnyBuildersClubMember: boolean
    IsPremium: boolean
}

/**
 * Set the cookie for the user
 * @param {string} cookie
 * @return {Promise<void>}
 */
export default function setCookie(cookie: string): Promise<LoggedInUserData> {
  return new Promise(async (resolve, reject) => {
    if (!cookie.toLowerCase().includes('warning:-')) {
      // eslint-disable-next-line max-len
      return reject(new TypeError('You didn\'t include the Roblox Warning. Please include the entire .ROBLOSECURITY cookie.'));
    }

    getCurrentUser(cookie).then(resolve).catch(reject);
  });
}
