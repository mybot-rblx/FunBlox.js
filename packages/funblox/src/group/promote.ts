/* eslint-disable max-len */
import changeRank from '../utils/changeRank';
import getIdFromName from '../utils/getIdFromName';
/**
 * **Promote**
 * @param {number } groupid
 * @param { number | string } user
 * @return {Promise<Object>}
 */
export default async function promote(groupid: number, user: string | number): Promise<Object> {
  return new Promise(async (resolve, reject) => {
    if (!isNaN(groupid)) {
      if (typeof user == 'number') {
        const result = await changeRank(groupid, user, 1);
        resolve(result);
      } else if (typeof user == 'string') {
        const userid = await getIdFromName(user);
        const result = await changeRank(groupid, userid, 1);
        resolve(result);
      } else {
        reject(new TypeError('User must be a number or a string'));
      }
    }
  });
}
