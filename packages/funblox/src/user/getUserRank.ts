/* eslint-disable max-len */
import { Response } from 'got-cjs';
import { groups } from '../api';
import getNameFromId from '../utils/getIdFromName';

interface RoleObject {
  id: number;
  name: string;
  rank: number;
}

/**
 * **getGroupRank**
 *
 * Gets user's group rank within a group
 * @param {number | string} groupId
 * @param {number | string} user
 * @return {Promise<RoleObject>} A Promise that resolves to the user's role in the group
 */
export default function getGroupRank(
    groupId: number | string,
    user: number | string,
): Promise<RoleObject> {
  return new Promise(async (resolve, reject) => {
    if (Number(user)) {
      const body: Response<string> = await groups.get(
          `v2/users/${Number(user)}/groups/roles?groupid=${Number(groupId)}`,
      );
      const parsedBody = JSON.parse(JSON.stringify(body.body));

      if (parsedBody.errors) {
        if (parsedBody.errors[0].code == 1) {
          return reject(new Error('Not found. - getUserRank.js'));
        }
      }

      const groupObject = parsedBody.data.find(
          (info) => groupId === info.group.id,
      );

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
