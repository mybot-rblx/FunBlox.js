const { groups, thumbnails } = require("./api");

async function test() {
    console.log('lol');
}

async function getGroupDetails(groupId) {
    return new Promise(async (resolve, reject) => {
        let roleResponse = await groups.get(`v1/groups/${groupId}/roles`);
        let thumbnailResponse = await thumbnails.get(`v1/groups/icons?format=Png&groupIds=${groupId}&isCircular=false&size=420x420`);
        let groupData = await groups.get(`v1/groups/${groupId}`)

        // parse json
        roleResponse = JSON.parse(roleResponse)
        thumbnailResponse = JSON.parse(thumbnailResponse)
        groupData = JSON.parse(groupData)
        
        // Time to return!
        let returnable = {
            id: groupData.id,
            name: groupData.name,
            description: groupData.description,
            owner: groupData.owner || null,
            membercount: groupData.membercount,
            thumbnail: thumbnailResponse.imageUrl,
            shout: null,
            roles: []
        }

        if (groupData.shout) {
            returnable.shout = {
                content: groupData.shout.body,
                created: groupData.shout.created,
                author: {
                    id: groupData.shout.poster.userId,
                    username: groupData.shout.poster.username,
                    displayName: groupData.shout.poster.displayName
                }
            }
        }

        for (const role of roleResponse.roles) {
            const i = roleResponse.roles.indexOf(role);
            returnable.roles.push({ "id": role.id, "name": role.name, "membercount": role.memberCount });
            if(i+1 == roleResponse.roles.length) return resolve(returnable);
        }
    });
}


module.exports = async function(identifier, type) {
    return new Promise(async (resolve, reject) => {
        if(!type) type = "id";
        if(type == "id") {
            getGroupDetails(identifier).then(finished => {
                resolve(finished);
            });
        } else if(type == "name" || type == "groupname" || type == "username") {
            let searchRes = await groups.get(`v1/groups/search/lookup?groupName=${identifier}`);

            searchRes = JSON.parse(searchRes)
            if(!searchRes.data.length) return reject('Not found. - getGroup.js');

            console.log(searchRes)

            getGroupDetails(searchRes.data[0].id).then(finished => {
                resolve(finished);
            });
        }
    });
}
