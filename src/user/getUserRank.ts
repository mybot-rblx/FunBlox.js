import * as Promise from "bluebird";
import { groups } from "../api";
import getUser from "./getUser";

function getGroupRank(group, user) {
    return new Promise(async (resolve, reject) => {
        let body = await groups.get(`v2/users/${user}/groups/roles`)

        if (body.data.errors) {
            if (body.data.errors[0].code == 1) return reject("Not found. - getUserRank.js");
        }

        const groupObject = body.data.data.find((info) => group === info.group.id)

        resolve(groupObject.role)
    })
}

export default function(group: number, user: number | string) {
    if (Number(user)){
        return new Promise(async (resolve, reject) => {
            getGroupRank(group, user).then(finished => {
                resolve(finished);
            });
        })
    } else {
        return new Promise(async (resolve, reject) => {
            let wow = await getUser(user)

            if (!wow) throw new TypeError("User was not found.")

            getGroupRank(group, wow.id).then(finished => {
                resolve(finished);
            });
        })
    }
}
