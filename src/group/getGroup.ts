import * as Promise from "bluebird";
import { groups, thumbnails } from "../api"

interface GroupData {
    id: number,
    name: string,
    description: string,
    owner: OwnerObject,
    membercount: number,
    thumbnail: string,
    shout: Shout,
    roles: Array<RoleJSON>
}

interface RoleJSON {
    id: number,
    name: string,
    membercount: number
}

interface OwnerObject {
    buildersClubMembershipType: string,
    userId: number,
    username: string,
    displayName: string
}

interface Shout {
    content: string,
    created: string,
    author: ShoutAuthor
}

interface ShoutAuthor {
    id: number,
    username: string
    displayName: string
}

async function wow(identifier: string | number): Promise<GroupData> {
    let roleResponse = await groups.get(`v1/groups/${identifier}/roles`);
    let thumbnailResponse = await thumbnails.get(`v1/groups/icons?format=Png&groupIds=${identifier}&isCircular=false&size=420x420`);
    let groupData = await groups.get(`v1/groups/${identifier}`)

    // Time to return!
    let returnable = {
        id: groupData.data.id || null,
        name: groupData.data.name || null,
        description: groupData.data.description || null,
        owner: groupData.data.owner || null,
        membercount: groupData.data.membercount || null,
        thumbnail: thumbnailResponse.data.imageUrl || null,
        shout: null,
        roles: []
    }

    if (groupData.data.shout) {
        returnable.shout = {
            content: groupData.data.shout.body,
            created: groupData.data.shout.created,
            author: {
                id: groupData.data.shout.poster.userId,
                username: groupData.data.shout.poster.username,
                displayName: groupData.data.shout.poster.displayName
            }
        }
    }

    for (const role of roleResponse.data.roles) {
        const i = roleResponse.data.roles.indexOf(role);
        returnable.roles.push({ "id": role.id, "name": role.name, "membercount": role.memberCount });
        if (i + 1 == roleResponse.data.roles.length) return returnable;
    }
}

export default function (identifier: number | string): Promise<GroupData> {
    return new Promise(async (resolve, reject) => {
        if (Number(identifier)) {
            wow(identifier).then(resolve).catch(reject);
        } else {
            let searchRes = await groups.get(`v1/groups/search/lookup?groupName=${identifier}`);

            if (!searchRes.data.data.length) return reject('Not found. - getGroup.js');

            wow(searchRes.data.data[0].id).catch(reject).then(resolve);
        }
    });
}