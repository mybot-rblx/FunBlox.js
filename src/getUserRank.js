const { groups } = require("./api");

async function getGroupRank(group, user) {
    return new Promise(async (resolve, reject) => {
        let body = await groups.get(`v2/users/${user}/groups/roles`, false)

        body = JSON.parse(body)

        if (body.errors) {
            if (errors[0].code == 1) return reject("Not found. - getUserRank.js");
        }

        const groupObject = body.data.find((info) => group === info.group.id)

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
        getGroupRank(group, user).then(finished => {
            resolve(finished);
        });
    })
}
