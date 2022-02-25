/* eslint-disable max-len */
import {api} from '../api';

interface IDFromUsername {
    Id: number;
}

/**
 *
 * @param {String | string} username
 * @return {Promise<number>}
 */
export default function getIdFromName(username: string): Promise<number> {
  return new Promise(async (resolve, reject) => {
    const res = await api.get(`users/get-by-username?username=${username}`);
    const data: IDFromUsername = JSON.parse(JSON.stringify(res.body));

    if (res.statusCode !== 200) return reject(new Error('Not found. - getUser.js'));

    resolve(data.Id);
  });
}
