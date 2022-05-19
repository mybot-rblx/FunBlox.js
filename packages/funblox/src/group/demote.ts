import { groups } from '../api';
import changeRank from '../utils/changeRank';
import getIdFromName from '../utils/getNameFromId';
/**
 * **Demote**
 * @param {number } groupid
 * @param { number | string } user
 * @return {Promise<Object>}
 */

export default async function (groupid: number, user: string | number): Promise<Object> {
  return new Promise(async (resolve, reject) => {
    if(!isNaN(groupid)){
      if(typeof user == 'number'){
        const result = await changeRank(groupid, user, Number(-1))
        resolve(result)
      }else if(typeof user == 'string'){
        const userid = await getIdFromName(user)
        const result = await changeRank(groupid, userid, Number(-1))
        resolve(result)
      }else{
        reject(new TypeError('User must be a number or a string'))
      }

    }
  })
}