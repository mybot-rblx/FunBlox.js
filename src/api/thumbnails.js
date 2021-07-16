let request = require('request-promise')
const baseURL = "https://thumbnails.roblox.com/"

request = request.defaults({
    forever: true,
    agentOptions: {
        maxSockets: Infinity
    },
    simple: false,
    gzip: true
})

function get(url) {
    return request({
        // will be ignored
        method: 'GET',
        uri: baseURL+url,
        headers: [
            {
                name: 'content-type',
                value: 'application/json'
            }
        ],
    })
}

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
        json: true
    })
}

module.exports = {
    get,
    post
}