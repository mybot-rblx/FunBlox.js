import axios from "axios";

axios.defaults.headers.get["Content-Type"] = "application/json";

export const api = axios.create({
    baseURL: 'https://api.roblox.com/',
    timeout: 1000,
});

export const groups = axios.create({
    baseURL: 'https://groups.roblox.com/',
    timeout: 1000,
});

export const games = axios.create({
    baseURL: 'https://games.roblox.com/',
    timeout: 1000,
});

export const catalog = axios.create({
    baseURL: 'https://catalog.roblox.com/',
    timeout: 1000,
})

export const friends = axios.create({
    baseURL: 'https://friends.roblox.com/',
    timeout: 1000,
});
export const thumbnails = axios.create({
    baseURL: 'https://thumbnails.roblox.com/',
    timeout: 1000,
});

export const users = axios.create({
    baseURL: 'https://users.roblox.com/',
    timeout: 1000,
});
