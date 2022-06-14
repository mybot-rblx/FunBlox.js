/* eslint-disable max-len */
import { economy } from '../api';
import cookieJar from '../utils/jar';
import getGeneralToken from '../utils/getGeneralToken';

interface GroupFunds {
  robux: number
}

/**
 * **getGroupFunds**
 * @param { number } groupid
 * @return { Promise<GroupFunds> }
 */
export default function getGroupFunds(groupid: number): Promise<GroupFunds> {
  return new Promise(async (resolve, reject) => {
    if(typeof groupid === 'number'){
      await economy.get(`v1/groups/${groupid}/currency`, {
        cookieJar, headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': await getGeneralToken() },
      }).then(function(data) {
        return resolve(data);
      }).catch(function(err) {
        return reject(err);
      });
    }
  })
}