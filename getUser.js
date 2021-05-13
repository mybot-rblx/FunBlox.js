const fetch = require('node-fetch');

async function getUserDetails(userid) {
    return new Promise((resolve, reject) => {
        fetch(`https://users.roblox.com/v1/users/${userid}/`).then(async (basicData) => {
            basicData = await basicData.json();
            fetch(`https://users.roblox.com/v1/users/${userid}/status`).then(async (statusResponse) => {
                statusResponse = await statusResponse.json();
                    fetch(`https://friends.roblox.com/v1/users/${userid}/followers`).then(async (followersResponse) => {
                        fetch(`https://friends.roblox.com/v1/users/${userid}/friends`).then(async (friendsResponse) => {
                            fetch(`https://friends.roblox.com/v1/users/${userid}/followings`).then(async (followingResponse) => {
                                fetch(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userid}&size=720x720&format=Png&isCircular=false`).then(async (avatarResponse) => {
                                    followersResponse = await followersResponse.json();
                                    friendsResponse = await friendsResponse.json();
                                    followingResponse = await followingResponse.json();
                                    avatarResponse = await avatarResponse.json();

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
                            });
                        });
                });
            });
        });
    });
}

module.exports = async function(identifier, type) {
    return new Promise((resolve, reject) => {

        if(!type) type = "id";

        if(type == "id") {
            fetch(`https://users.roblox.com/v1/users/${identifier}/`).then(async (response) => {
                if(response.status == 404) return reject("Not found.")
                response = await response.json();

                getUserDetails(response.id).then(finished => {
                    resolve(finished);
                });
            });
        } else if(type == "username") {
            fetch(`https://api.roblox.com/users/get-by-username?username=${identifier}`).then(async (response) => {
                response = await response.json();
                if(response.success !== 'undefined') {
                    if(response.success == false) return reject("Not found.");
                }
                getUserDetails(response.Id).then(finished => {
                    resolve(finished);
                });
            });
        }
    });
}
