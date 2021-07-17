import { groups } from "../api";
import getUser from "./getUser";

async function getGroupRank(group, user) {
    return new Promise(async (resolve, reject) => {
        let body = await groups.get(`v2/users/${user}/groups/roles`)

        if (body.data.errors) {
            if (body.data.errors[0].code == 1) return reject("Not found. - getUserRank.js");
        }

        const groupObject = body.data.data.find((info) => group === info.group.id)

        resolve(groupObject.role)
    })
}

export default async function (group: Number, user: [Number, String]): Promise<Object> {
    return new Promise(async (resolve, reject) => {
        if (!group) {
            throw new TypeError("Please enter a valid GROUP_ID. The format is: roblox.getUserRank(groupid, userid)");
        }
        if (!user) {
            throw new TypeError("Please enter a valid USER_ID. The format is: roblox.getUserRank(groupid, userid)");
        }
        if (typeof user === "number") {
            getGroupRank(group, user).then(finished => {
                resolve(finished);
            });
        } else if (typeof user === "string") {
            if (Number(user)) {
                getGroupRank(group, user).then(finished => {
                    resolve(finished);
                });
            } else {
                let wow = await getUser(user, "username")

                wow.id
            }
        }
    })
}
