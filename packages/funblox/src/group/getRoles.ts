/* eslint-disable max-len */
import { Response } from 'got-cjs';
import { groups } from '../api';

interface Roles {
  roles: Array<RoleJSON>
}

interface RoleJSON {
  id: number;
  name: string;
  membercount: number;
}


/**
 *
 * @param { number } groupid
 * @return {Promise<Roles>}
 */
export default function getRoles( groupid: number ): Promise<Roles> {
  return new Promise(async (resolve, reject) => {
    if (typeof groupid === 'number') {
      const roleResponse: Response<string> = await groups.get(
          `v1/groups/${groupid}/roles`,
      );
      const roles = JSON.parse(JSON.stringify(roleResponse.body));
      const data = {
        roles: [],
      };

      for (const role of roles.roles) {
        const i = roles.roles.indexOf(role);
        data[0].roles.push({
          id: role.id,
          name: role.name,
          membercount: role.memberCount,
        });
        if (i + 1 == roles.roles.length) return resolve(data);
      }

      return resolve(data);
    } else {
      reject(new TypeError('Group param must be a number'));
    }
  });
}
