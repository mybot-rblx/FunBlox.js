import getGroupByID from "./getGroupByID";
import { groups } from "../api";

export default function(name: String) {
    return new Promise(async (resolve, reject) => {
        let searchRes = await groups.get(`v1/groups/search/lookup?groupName=${name}`);

        if(!searchRes.data.data.length) return reject('Not found. - getGroup.js');

        getGroupByID(searchRes.data.data[0].id).then(finished => {
            resolve(finished);
        });
    })
}