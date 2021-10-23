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

interface OriginalShoutPosterData {
    buildersClubMembershipType: string,
    userId: number,
    username: string,
    displayName: string
}
interface OriginalShoutData {
    body: string,
    poster: OriginalShoutPosterData
    created: string,
    updated: string
}

interface OriginalGroupOwnerData {
    buildersClubMembershipType: string,
    userId: number,
    username: string,
    displayName: string
}
interface OriginalGroupData {
    id: number,
    name: string,
    description: string,
    owner: OriginalGroupOwnerData
    shout: OriginalShoutData,
    memberCount: number,
    isBuildersClubOnly: boolean,
    publicEntryAllowed: boolean,
    isLocked: boolean
}

interface AxiosResponseGroup {
    // `data` is the response that was provided by the server
    data: OriginalGroupData,
  
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
interface ShoutAuthor {
    id: number,
    username: string
    displayName: string
}

async function wow(identifier: string | number) {
    let roleResponse: AxiosResponse = await groups.get(`v1/groups/${identifier}/roles`);
    let thumbnailResponse: AxiosResponse = await thumbnails.get(`v1/groups/icons?format=Png&groupIds=${identifier}&isCircular=false&size=420x420`);
    let groupData: AxiosResponseGroup = await groups.get(`v1/groups/${identifier}`)


    // Time to return!
    let returnable = {
        id: groupData.data.id || null,
        name: groupData.data.name || null,
        description: groupData.data.description || null,
        owner: groupData.data.owner || null,
        membercount: groupData.data.memberCount || null,
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
            const searchRes: AxiosResponse = await groups.get(`v1/groups/search/lookup?groupName=${identifier}`);

            if (!searchRes.data.data.length) return reject('Not found. - getGroup.js');

            wow(searchRes.data.data[0].id).catch(reject).then(resolve);
        }
    });
}