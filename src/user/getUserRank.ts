import { resolve } from "path/posix";
import { groups } from "../api";
import GetUser from "./getUser";

const getUser = new GetUser()

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
export default class {
    async byUsername(group: Number, user: String) {
        if (!group) {
            throw new TypeError("Please enter a valid GROUP_ID. The format is: roblox.getUserRank(groupid, userid)");
        }
        if (!user) {
            throw new TypeError("Please enter a valid USER_ID. The format is: roblox.getUserRank(groupid, userid)");
        }

        let wow = await getUser.byUsername(user)

        if (!wow) throw new TypeError("User was not found.")

        return new Promise(async (resolve, reject) => {
            getGroupRank(group, wow.id).then(finished => {
                resolve(finished);
            });
        })
    }

    byID(group: Number, user: Number) {
        if (!group) {
            throw new TypeError("Please enter a valid GROUP_ID. The format is: roblox.getUserRank(groupid, userid)");
        }
        if (!user) {
            throw new TypeError("Please enter a valid USER_ID. The format is: roblox.getUserRank(groupid, userid)");
        }

        return new Promise(async (resolve, reject) => {
            getGroupRank(group, user).then(finished => {
                resolve(finished);
            });
        })
    }
}
