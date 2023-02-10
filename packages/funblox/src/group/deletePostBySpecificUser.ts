/* eslint-disable max-len */
import { groups } from '../api';
import cookieJar from '../utils/jar';
import getGeneralToken from '../utils/getGeneralToken';

/**
 * **deletePostBySpecificUser**
 * @param { number } groupid
 * @param { number } userid 

 * @return { Promise<Object> }
 */
export default function deletePostBySpecificUser(groupid: number, userid: number): Promise<Object> {
  return new Promise(async (resolve, reject) => {
    if(typeof groupid === 'number' && typeof userid === 'number'){

      const response = await groups.delete(`/v1/groups/${groupid}/wall/users/${userid}/posts`, {
        cookieJar, headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': await getGeneralToken() },
      })

      if (response.statusCode !== 200) return reject(new Error(""))

      return resolve(userid);
    }
  })
}