const fetch = require('node-fetch');

async function test() {
    console.log('lol');
}

async function getGroupDetails(groupId) {
    return new Promise(async (resolve, reject) => {
        let roleResponse = await fetch(`https://groups.roblox.com/v1/groups/${groupId.id}/roles`, {
            headers: {'Content-Type': 'application/json'}
        });
        let thumbnailResponse = await fetch(`https://thumbnails.roblox.com/v1/groups/icons?format=Png&groupIds=${groupId.id}&isCircular=false&size=420x420`, {
            headers: {'Content-Type': 'application/json'}
        });
        let groupData = await fetch(`https://groups.roblox.com/v2/groups?groupIds=${groupId}`, {
            headers: {'Content-Type': 'application/json'}
        });
        let groupDataV1 = await fetch(`https://groups.roblox.com/v1/groups/${groupId}`, {
            headers: {'Content-Type': 'application/json'}
        })
        
        // turn all responses into jsons
        groupData = await groupData.json();
        groupDataV1 = await groupDataV1.json();
        roleResponse = await roleResponse.json();
        thumbnailResponse = await thumbnailResponse.json();

        // Time to return!
        const returnable = {
            "id": groupData.id,
            "name": groupData.name,
            "description": groupData.description,
            "owner": {
                "id": groupData.owner.id,
                "username": groupDataV1.owner.name
            },
            "membercount": groupDataV1.membercount,
            "thumbnail": thumbnailResponse.data[0].imageUrl,
            "shout": {
                "content": groupDataV1.shout.body,
                "created": groupDataV1.shout.created,
                "author": {
                    "id": groupDataV1.shout.poster.userId,
                    "username": groupDataV1.shout.poster.username
                }
            },
            "roles": []
        }

        for (const role of roleResponse.roles) {
            const i = roleResponse.roles.indexOf(role);
            returnable.roles.push({ "id": role.id, "name": role.name, "membercount": role.memberCount });
            if(i+1 == roleResponse.roles.length) return resolve(returnable);
        }
    });
}


module.exports = async function(identifier, type) {
    return new Promise((resolve, reject) => {
        if(!type) type = "id";
        if(type == "id") {
            getGroupDetails(identifier).then(finished => {
                resolve(finished);
            });
        } else if(type == "name" || type == "groupname" || type == "username") {
            fetch(`https://groups.roblox.com/v1/groups/search/lookup?groupName=${identifier}`, {
                headers: {'Content-Type': 'application/json'}
            }).then(async (searchRes) => {
                searchRes = await searchRes.json();
                if(!searchRes.data) return reject('Not found.');
                getGroupDetails(searchRes.data[0].id).then(finished => {
                    resolve(finished);
                });
            });
        }
    });
}
