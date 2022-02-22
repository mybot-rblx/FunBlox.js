/* eslint-disable max-len */
import {request} from 'undici';

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
    const apiLink = 'https://api.roproxy.com';
    const {
      statusCode,
      body,
    } = await request(`${apiLink}/users/get-by-username?username=${username}`);
    const data: IDFromUsername = await body.json();

    if (statusCode !== 200) return reject(new Error('Not found. - getUser.js'));

    resolve(data.Id);
  });
}
