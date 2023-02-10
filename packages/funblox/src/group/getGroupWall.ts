/* eslint-disable max-len */
import { groups } from '../api';
import cookieJar from '../utils/jar';
import getGeneralToken from '../utils/getGeneralToken';

interface WallResponse {
  data: [];
}

/**
 * **getGroupWall**
 * @param { number } groupid
 * @param { number } limit //Max 100
 * @param { string } cursor
 * @param { string } sortOrder
 * @return { Promise<WallResponse> }
 */
export default function getGroupWall(groupid: number, limit?: number, cursor?: string, sortOrder?: string): Promise<WallResponse> {
  return new Promise(async (resolve, reject) => {
    if(typeof groupid === 'number'){
      if(!cursor) cursor = 'cursor'
      if(!limit) limit = 10
      if(!sortOrder) sortOrder = 'Asc'

      const response = await groups.get(`/v1/groups/${groupid}/wall/posts?limit=${limit}?cursor=${cursor}?sortOrder=${sortOrder}`, {
        cookieJar, headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': await getGeneralToken() },
      })

      if (response.statusCode !== 200) return reject(new Error(""))

      return resolve(JSON.parse(JSON.stringify(response.body)));
    }
  })
}