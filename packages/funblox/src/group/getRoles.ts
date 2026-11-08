/* eslint-disable max-len */
import { Response } from 'got-cjs';
import { groups } from '../api';
import { DualModeOptions, wantsOpenCloud } from '../utils/requestOptions';
import { getDefaultOpenCloud } from '../opencloud/client';

interface Roles {
  roles: Array<{ id: number; name: string; membercount: number }>;
}

/**
 * Get group roles.
 * Pass `{ useOpenCloud: true }` to use Open Cloud.
 */
export default function getRoles(groupid: number, options?: DualModeOptions): Promise<Roles | any> {
  if (wantsOpenCloud(options)) {
    return getDefaultOpenCloud().listGroupRoles(groupid);
  }

  return new Promise(async (resolve, reject) => {
    if (typeof groupid === 'number') {
      try {
        const roleResponse: Response<string> = await groups.get(
          `v1/groups/${groupid}/roles`,
        );
        const roles = JSON.parse(JSON.stringify(roleResponse.body));
        const data: Roles = { roles: [] };

        for (const role of roles.roles || []) {
          data.roles.push({
            id: role.id,
            name: role.name,
            membercount: role.memberCount,
          });
        }

        resolve(data);
      } catch (err) {
        reject(err);
      }
    } else {
      reject(new TypeError('Group param must be a number'));
    }
  });
}
