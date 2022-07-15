/* eslint-disable max-len */
import { Response } from 'got-cjs';
import { groups } from '../api';
import getNameFromId from '../utils/getIdFromName';

interface GroupObject {
  data: []
}

/**
 * **getGroups**
 *
 * Gets user's groups
 * @param {number | string} user
 * @return {Promise<GroupObject>} A Promise that resolves to the user's groups
 */
export default function getGroups(
    user: number | string,
): Promise<GroupObject> {
  return new Promise(async (resolve, reject) => {
    if (Number(user)) {
      const body: Response<string> = await groups.get(
          `v2/users/${Number(user)}/groups/roles`,
      );
      const parsedBody = JSON.parse(JSON.stringify(body.body));

      if (parsedBody.errors) {
        if (parsedBody.errors[0].code == 1) {
          return reject(new Error('Not found. - getUserRank.js'));
        }
      }


      resolve(parsedBody);
    } else {
      // Ensure it is an acutal string and get the user's id
      if (typeof user === 'string') {
        const wow = await getNameFromId(user);

        if (!wow) return reject(new TypeError('User was not found.'));

        const result = await getGroups(wow);

        resolve(result);
      }
    }
  });
}
