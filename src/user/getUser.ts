import * as Promise from "bluebird";
import { friends, thumbnails, users, api } from "../api";

interface UserResponse {
    "id": number,
    "username": string,
    "description": string,
    "status": string,
    "created": string,
    "avatar_url": string,
    "friends": {
        "count": number,
        "ids": Array<number>
    },
    "followers": {
        "count": number,
        "ids": Array<number>
    },
    "following": {
        "count": number,
        "ids": Array<number>
    }
}

async function getUserDetails(userid) {
        let basicData = await users.get(`v1/users/${userid}/`)
        let statusResponse = await users.get(`v1/users/${userid}/status`)
        let followersResponse = await friends.get(`v1/users/${userid}/followers`)
        let friendsResponse = await friends.get(`v1/users/${userid}/friends`)
        let followingResponse = await friends.get(`v1/users/${userid}/followings`);
        let avatarResponse = await thumbnails.get(`v1/users/avatar?userIds=${userid}&size=720x720&format=Png&isCircular=false`)

        let followersArr = [];
        followersResponse.data.data.forEach(user => {
            followersArr.push(user.id);
        });
        let friendsArr = [];
        friendsResponse.data.data.forEach(user => {
            friendsArr.push(user.id);
        });
        let followingArr = [];
        followingResponse.data.data.forEach(user => {
            followingArr.push(user.id);
        });

        return {
            "id": basicData.data.id,
            "username": basicData.data.name,
            "description": basicData.data.description,
            "status": statusResponse.data.status,
            "created": basicData.data.created,
            "avatar_url": avatarResponse.data.data[0].imageUrl,
            "friends": {
                "count": friendsArr.length,
                "ids": friendsArr
            },
            "followers": {
                "count": followersArr.length,
                "ids": followersArr
            },
            "following": {
                "count": followingArr.length,
                "ids": followingArr
            }
        };
}

export default function(identifier: number | string): Promise<UserResponse> {
    return new Promise(async (resolve, reject) => {
        if (Number(identifier)) {
            getUserDetails(identifier).then((finished: UserResponse) => {
                return resolve(finished);
            })
        } else {
            let response = await api.get(`users/get-by-username?username=${identifier}`)

            if (response.data.success === false) return reject("Not found. - getUser.js");

            getUserDetails(response.data.Id).then((finished: UserResponse) => {
                return resolve(finished);
            });
        }
    });
}