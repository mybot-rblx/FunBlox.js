/* eslint-disable max-len */
import {groups} from '../api';
import getNameFromId from '../utils/getNameFromId';

interface AxiosResponse {
    // `data` is the response that was provided by the server
    data: any,

    // `status` is the HTTP status code from the server response
    status: number,

    // `statusText` is the HTTP status message from the server response
    statusText: string,

    // `headers` the HTTP headers that the server responded with
    // All header names are lower cased and can be accessed using the bracket notation.
    // Example: `response.headers['content-type']`
    headers: object,

    // `config` is the config that was provided to `axios` for the request
    config: object,

    // `request` is the request that generated this response
    // It is the last ClientRequest instance in node.js (in redirects)
    // and an XMLHttpRequest instance in the browser
    request: object
}

interface RoleObject {
    id: number,
    name: string,
    rank: number
}

/**
 * **getGroupRank**
 *
 * Gets user's group rank within a group
 * @param {number | string} groupId
 * @param {number | string} user
 * @return {Promise<RoleObject>} A Promise that resolves to the user's role in the group
 */
export default function getGroupRank(groupId: number | string, user: number | string): Promise<RoleObject> {
  return new Promise(async (resolve, reject) => {
    if (Number(user)) {
      const body: AxiosResponse = await groups.get(`v2/users/${Number(user)}/groups/roles`);

      if (body.data.errors) {
        if (body.data.errors[0].code == 1) return reject(new Error('Not found. - getUserRank.js'));
      }

      const groupObject = body.data.data.find((info) => groupId === info.group.id);

      if (!groupObject) return reject(new Error('Not found. - getUserRank.js'));

      resolve(groupObject.role);
    } else {
      // Ensure it is an acutal string and get the user's id
      if (typeof user === 'string') {
        const wow = await getNameFromId(user);

        if (!wow) return reject(new TypeError('User was not found.'));

        const result = await getGroupRank(groupId, wow);

        resolve(result);
      }
    }
  });
}
