/* eslint-disable max-len */
import { groups } from '../api';
import getGroupRank from '../user/getUserRank';
import cookieJar from '../utils/jar';
import getGeneralToken from '../utils/getGeneralToken';
import getRole from './getRole';
import { DualModeOptions, wantsOpenCloud } from '../utils/requestOptions';
import { getDefaultOpenCloud } from '../opencloud/client';

/**
 * Set a user's rank in a group.
 * Pass `{ useOpenCloud: true }` as the 4th argument to use Open Cloud
 * (assignRole) instead of the legacy cookie + CSRF endpoint.
 */
export default function setRank(
  groupid: number,
  user: number,
  newrank: number,
  options?: DualModeOptions,
): Promise<object> {
  if (wantsOpenCloud(options)) {
    return getDefaultOpenCloud().setRank(groupid, user, newrank) as Promise<object>;
  }

  return new Promise(async (resolve, reject) => {
    if (typeof groupid == 'number' && typeof user == 'number' && typeof newrank == 'number') {
      try {
        const userRank = await getGroupRank(groupid, user);
        const data = { roleId: newrank };

        await groups.patch(`v1/groups/${groupid}/users/${user}`, {
          cookieJar,
          json: data,
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': await getGeneralToken(),
          },
        });

        const newRankInfo = await getRole(groupid, newrank);
        resolve({ oldRank: userRank, newRank: newRankInfo });
      } catch (err) {
        reject(err);
      }
    } else {
      reject(new TypeError('All the parameters in this function should be numeric, please check your parameters'));
    }
  });
}
