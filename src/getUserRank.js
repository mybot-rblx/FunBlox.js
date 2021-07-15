const fetch = require('node-fetch');

async function getGroupRank(Data) {
    return new Promise(async (resolve, reject) => {
        let body = await fetch(`https://groups.roblox.com/v2/users/${Data.userId}/groups/roles`, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        body = await body.json();
        const groupObject = body.data.find((info) => Data.groupId === info.group.id)

        resolve(groupObject ? parseInt(groupObject.role.rank) : 0)
    })
}

module.exports = async function (group, user) {
    return new Promise(async (resolve, reject) => {
        if (!group) {
            throw new TypeError("Please enter a valid GROUP_ID. The format is: roblox.getUserRank(groupid, userid)");
        }
        if (!user) {
            throw new TypeError("Please enter a valid USER_ID. The format is: roblox.getUserRank(groupid, userid)");
        }
        fetch(`https://groups.roblox.com/v2/users/${Data.userId}/groups/roles`, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (response) => {
            if (response.success !== 'undefined') {
                if (response.status == 404) return reject("Not found.");
            }
            response = await response.json();
            if (typeof response.errors !== 'undefined') {
                if (errors[0].code == 1) return reject("Not found.");
            }
            getGroupRank(response).then(finished => {
                resolve(finished);
            });
        })
    })
}