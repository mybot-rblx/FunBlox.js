import axios from 'axios';

axios.defaults.headers.get['Content-Type'] = 'application/json';

export const api = axios.create({
  baseURL: 'https://api.roproxy.com/',
  timeout: 3000,
});

export const groups = axios.create({
  baseURL: 'https://groups.roproxy.com/',
  timeout: 3000,
});

export const games = axios.create({
  baseURL: 'https://games.roproxy.com/',
  timeout: 3000,
});

export const catalog = axios.create({
  baseURL: 'https://catalog.roblox.com/',
  timeout: 3000,
});

export const friends = axios.create({
  baseURL: 'https://friends.roproxy.com/',
  timeout: 3000,
});
export const thumbnails = axios.create({
  baseURL: 'https://thumbnails.roproxy.com/',
  timeout: 3000,
});

export const users = axios.create({
  baseURL: 'https://users.roblox.com/',
  timeout: 3000,
});
