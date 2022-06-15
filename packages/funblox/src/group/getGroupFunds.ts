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
      const response = await economy.get(`v1/groups/${groupid}/currency`, {
        cookieJar, headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': await getGeneralToken() },
      })

      if (response.statusCode !== 200) return reject(new Error(""))

      return resolve(JSON.parse(JSON.stringify(response.body)));
    }
  })
}