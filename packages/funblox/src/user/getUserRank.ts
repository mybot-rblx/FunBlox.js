import * as Promise from "bluebird";
import { groups } from "../api";
import getUser from "./getUser";

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

function getGroupRank(group: number, user: number | string) {
    return new Promise(async (resolve, reject) => {
        const body: AxiosResponse = await groups.get(`v2/users/${user}/groups/roles`)

        if (body.data.errors) {
            if (body.data.errors[0].code == 1) return reject("Not found. - getUserRank.js");
        }

        const groupObject = body.data.data.find((info) => group === info.group.id)

        resolve(groupObject.role)
    })
}

export default function(group: number, user: number | string) {
    return new Promise(async (resolve, reject) => {
        if (Number(user)) {
                    getGroupRank(group, user).then(resolve).catch(reject);
        } else {
                const wow = await getUser(user)

                if (!wow) throw new TypeError("User was not found.")

                getGroupRank(group, wow.id).then(resolve).catch(reject);
            
        };
    });
}
