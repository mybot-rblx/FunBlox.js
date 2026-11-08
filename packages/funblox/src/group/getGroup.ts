/* eslint-disable max-len */
import { Response } from 'got-cjs';
import { groups, thumbnails } from '../api';
import { DualModeOptions, wantsOpenCloud } from '../utils/requestOptions';
import { getDefaultOpenCloud } from '../opencloud/client';

interface GroupData {
  id: number;
  name: string;
  description: string;
  owner: OwnerObject;
  membercount: number;
  thumbnail: string;
  shout: Shout;
  roles: Array<RoleJSON>;
  openCloud?: boolean;
}

interface RoleJSON {
  id: number;
  name: string;
  membercount: number;
}

interface OwnerObject {
  buildersClubMembershipType: string;
  userId: number;
  username: string;
  displayName: string;
}

interface Shout {
  content: string;
  created: string;
  author: ShoutAuthor;
}

interface ShoutAuthor {
  id: number;
  username: string;
  displayName: string;
}

async function fetchGroupById(groupId: number): Promise<GroupData> {
  const roleResponse: Response<string> = await groups.get(`v1/groups/${groupId}/roles`);
  const thumbnailResponse: Response<string> = await thumbnails.get(
    `v1/groups/icons?format=Png&groupIds=${groupId}&isCircular=false&size=420x420`,
  );
  const groupData: Response<string> = await groups.get(`v1/groups/${groupId}`);

  const roles = JSON.parse(JSON.stringify(roleResponse.body));
  const group = JSON.parse(JSON.stringify(groupData.body));
  const thumbnail = JSON.parse(JSON.stringify(thumbnailResponse.body));

  const returnable: any = {
    id: group.id || null,
    name: group.name || null,
    description: group.description || null,
    owner: group.owner || null,
    membercount: group.memberCount || null,
    thumbnail: thumbnail.data?.[0]?.imageUrl || null,
    shout: null,
    roles: [],
  };

  if (group.shout) {
    returnable.shout = {
      content: group.shout.body,
      created: group.shout.created,
      author: {
        id: group.shout.poster.userId,
        username: group.shout.poster.username,
        displayName: group.shout.poster.displayName,
      },
    };
  }

  for (const role of roles.roles || []) {
    returnable.roles.push({
      id: role.id,
      name: role.name,
      membercount: role.memberCount,
    });
  }

  return returnable;
}

/**
 * Get group info by id or name.
 * Pass `{ useOpenCloud: true }` as second argument to use Open Cloud.
 */
export default function getGroup(
  identifier: number | string,
  options?: DualModeOptions,
): Promise<GroupData | any> {
  if (wantsOpenCloud(options)) {
    return getDefaultOpenCloud().getGroup(identifier).then((data: any) => ({
      ...data,
      openCloud: true,
    }));
  }

  return new Promise(async (resolve, reject) => {
    try {
      let groupId: number | null = null;

      if (typeof identifier === 'number') {
        groupId = identifier;
      } else if (typeof identifier === 'string' && /^\d+$/.test(identifier.trim())) {
        groupId = Number(identifier.trim());
      } else if (typeof identifier === 'string') {
        // Search by name
        const search: Response<string> = await groups.get(
          `v1/groups/search?keyword=${encodeURIComponent(identifier)}&limit=10`,
        );
        const data = JSON.parse(JSON.stringify(search.body));
        const match = (data.data || []).find(
          (g: any) => g.name?.toLowerCase() === identifier.toLowerCase(),
        ) || data.data?.[0];
        if (!match?.id) {
          reject(new Error('Group not found'));
          return;
        }
        groupId = match.id;
      }

      if (groupId == null) {
        reject(new TypeError('Invalid group identifier'));
        return;
      }

      resolve(await fetchGroupById(groupId));
    } catch (err) {
      reject(err);
    }
  });
}
