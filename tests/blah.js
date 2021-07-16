const { groups, friends } = require("../src/api");


    let response = friends.get('v1/users/156711358/followers');

    response = JSON.parse(response)

    console.log(response);