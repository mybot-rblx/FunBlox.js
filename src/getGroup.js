const fetch = require('node-fetch');

async function test() {
    console.log('lol');
}

async function getGroupDetails(groupData) {
    return new Promise((resolve, reject) => {
        fetch(`https://groups.roblox.com/v1/groups/${groupData.id}/roles`).then(async (roleResponse) => {
            roleResponse = await roleResponse.json();
            fetch(`https://thumbnails.roblox.com/v1/groups/icons?format=Png&groupIds=${groupData.id}&isCircular=false&size=420x420`).then(async (thumbnailResponse) => {
                thumbnailResponse = await thumbnailResponse.json();
                const returnable = {
                    "id": groupData.id,
                    "name": groupData.name,
                    "description": groupData.description,
                    "owner": {
                        "id": groupData.owner.userId,
                        "username": groupData.owner.username
                    },
                    "membercount": groupData.membercount,
                    "thumbnail": thumbnailResponse.data[0].imageUrl,
                    "shout": {
                        "content": groupData.shout.body,
                        "created": groupData.shout.created,
                        "author": {
                            "id": groupData.shout.poster.userId,
                            "username": groupData.shout.poster.username
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
        });
    });
}


module.exports = async function(identifier, type) {
    return new Promise((resolve, reject) => {
        if(!type) type = "id";
        if(type == "id") {
            fetch(`https://groups.roblox.com/v1/groups/${identifier}/`).then(async (response) => {
                if(response.success !== 'undefined') {
                    if(response.status == 404) return reject("Not found.");
                }
                response = await response.json();
                if(typeof response.errors !== 'undefined') {
                    if(errors[0].code == 1) return reject("Not found.");
                }

                getGroupDetails(response).then(finished => {
                    resolve(finished);
                });
            });
        } else if(type == "name" || type == "groupname" || type == "username") {
            fetch(`https://groups.roblox.com/v1/groups/search/lookup?groupName=${identifier}`).then(async (searchRes) => {
                searchRes = await searchRes.json();
                if(typeof searchRes.data === 'undefined') return reject('Not found.');
                fetch(`https://groups.roblox.com/v1/groups/${searchRes.data[0].id}/`).then(async (response) => {
                    response = await response.json();
                    getGroupDetails(response).then(finished => {
                        resolve(finished);
                    });
                });
            });
        }
    });
}
