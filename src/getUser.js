const { friends, thumbnails, users, api } = require("./api");


async function getUserDetails(userid) {
    return new Promise(async (resolve, reject) => {
        let basicData = await users.get(`v1/users/${userid}/`)
        let statusResponse = await users.get(`v1/users/${userid}/status`)
        let followersResponse = await friends.get(`v1/users/${userid}/followers`)
        let friendsResponse = await friends.get(`v1/users/${userid}/friends`)
        let followingResponse = await friends.get(`v1/users/${userid}/followings`);
        let avatarResponse = await thumbnails.get(`v1/users/avatar?userIds=${userid}&size=720x720&format=Png&isCircular=false`)

        // parse responses to json
        basicData = JSON.parse(basicData)
        statusResponse = JSON.parse(statusResponse)
        followersResponse = JSON.parse(followersResponse)
        friendsResponse = JSON.parse(friendsResponse)
        followingResponse = JSON.parse(followingResponse)
        avatarResponse = JSON.parse(avatarResponse)
        
        let followersArr = [];
        followersResponse.data.forEach(user => {
            followersArr.push(user.id);
        });
        let friendsArr = [];
        friendsResponse.data.forEach(user => {
            friendsArr.push(user.id);
        });
        let followingArr = [];
        followingResponse.data.forEach(user => {
            followingArr.push(user.id);
        });

        resolve({
            "id": basicData.id,
            "username": basicData.name,
            "description": basicData.description,
            "status": statusResponse.status,
            "created": basicData.created,
            "avatar_url": avatarResponse.data[0].imageUrl,
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
        });
    });
}

module.exports = async function(identifier, type) {
    return new Promise(async (resolve, reject) => {

        if(!type) type = "id";

        if(type == "id") {
            getUserDetails(identifier).then(finished => {
                resolve(finished);
            });
        } else if(type == "username") {
            let response = await api.get(`users/get-by-username?username=${identifier}`)

            response = JSON.parse(response)

            if(response.success === false) return reject("Not found. - getUser.js");

            getUserDetails(response.Id).then(finished => {
                resolve(finished);
            });
        }
    });
}
