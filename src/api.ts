import axios from "axios";

export const api = axios.create({
    baseURL: 'https://api.roblox.com/',
    timeout: 1000,
});

export const groups = axios.create({
    baseURL: 'https://groups.roblox.com/',
    timeout: 1000,
});

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
