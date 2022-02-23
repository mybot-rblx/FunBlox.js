import got from 'got-cjs';

export const apiCache = new Map();
export const groupsCache = new Map();
export const gamesCache = new Map();
export const catalogCache = new Map();
export const thumbnailsCache = new Map();
export const usersCache = new Map();

export const api = got.extend({
  prefixUrl: 'https://rprxy.mybot-rblx.tk/api/',
  responseType: 'json',
  cache: apiCache,
});

export const groups = got.extend({
  prefixUrl: 'https://rprxy.mybot-rblx.tk/groups/',
  responseType: 'json',
  cache: groupsCache,
});

export const games = got.extend({
  prefixUrl: 'https://rprxy.mybot-rblx.tk/games/',
  responseType: 'json',
  cache: gamesCache,
});

export const catalog = got.extend({
  prefixUrl: 'https://rprxy.mybot-rblx.tk/catalog/',
  responseType: 'json',
  cache: catalogCache,
});

export const friends = got.extend({
  prefixUrl: 'https://rprxy.mybot-rblx.tk/friends/',
  responseType: 'json',
  cache: catalogCache,
});
export const thumbnails = got.extend({
  prefixUrl: 'https://rprxy.mybot-rblx.tk/thumbnails/',
  responseType: 'json',
  cache: thumbnailsCache,
});

export const users = got.extend({
  prefixUrl: 'https://rprxy.mybot-rblx.tk/users/',
  responseType: 'json',
  cache: usersCache,
});
