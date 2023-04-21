/* eslint-disable max-len */
import { users } from '../api';
import type { SearchUserAPIResponse } from './APITypes';

/**
 *
 * @param {String | string} username
 * @return {Promise<number>}
 */
export default function getIdFromName(username: string, showBannedUsers?: boolean): Promise<number> {
  return new Promise(async (resolve, reject) => {
    const res = await users.post(`v1/usernames/users`, { 
      json: {
        "usernames": [username],
        "excludeBannedUsers": showBannedUsers || false
      },
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      }
    });
    const data: SearchUserAPIResponse = JSON.parse(JSON.stringify(res.body));

    if (res.statusCode !== 200) {
      return reject(new Error('Not found. - utils/getIdFromName.js'));
    }

    resolve(data.data[0].id);
  });
}
