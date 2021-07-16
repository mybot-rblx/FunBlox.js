import getGroup from './getGroupByID'
import { groups, thumbnails } from "../api"

async function test() {
    console.log('lol');
}

export default async function (identifier: Number): Promise<Object> {
    return new Promise(async (resolve, reject) => {
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
            if (i + 1 == roleResponse.data.roles.length) return resolve(returnable);
        }
    });
}
