let request = require('request-promise')
const baseURL = "https://groups.roblox.com/"

request = request.defaults({
    forever: true,
    agentOptions: {
        maxSockets: Infinity
    },
    simple: false,
    gzip: true
})

function get(url, json) {
    return request({
        // will be ignored
        method: 'GET',
        uri: baseURL+url,
    });
};

function post(url, body) {
    return request({
        // will be ignored
        method: 'POST',
        uri: baseURL+url,
        headers: [
            {
                name: 'content-type',
                value: 'application/json'
            }
        ],
    });
};

module.exports = {
    get,
    post
}