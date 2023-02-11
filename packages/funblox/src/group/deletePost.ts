/* eslint-disable max-len */
import { groups } from '../api';
import cookieJar from '../utils/jar';
import getGeneralToken from '../utils/getGeneralToken';

/**
 * **deletePost**
 * @param { number } groupid
 * @param { number } postId 

 * @return { Promise<Object> }
 */
export default function deletePost(groupid: number, postId: number): Promise<Object> {
  return new Promise(async (resolve, reject) => {
    if(typeof groupid === 'number' && typeof postId === 'number'){

      const response = await groups.delete(`/v1/groups/${groupid}/wall/posts/${postId}`, {
        cookieJar, headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': await getGeneralToken() },
      })

      if (response.statusCode !== 200) return reject(new Error(""))

      return resolve(postId);
    }
  })
}