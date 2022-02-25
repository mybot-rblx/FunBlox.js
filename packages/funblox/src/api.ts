import got from 'got-cjs';

export const apiCache = new Map();
export const groupsCache = new Map();
export const gamesCache = new Map();
export const catalogCache = new Map();
export const thumbnailsCache = new Map();
export const usersCache = new Map();

export const api = got.extend({
  prefixUrl: 'https://api.roproxy.com/',
  responseType: 'json',
  cache: apiCache,
});

export const groups = got.extend({
  prefixUrl: 'https://groups.roproxy.com/',
  responseType: 'json',
  cache: groupsCache,
});

export const games = got.extend({
  prefixUrl: 'https://games.roproxy.com/',
  responseType: 'json',
  cache: gamesCache,
});

export const catalog = got.extend({
  prefixUrl: 'https://catalog.roproxy.com/',
  responseType: 'json',
  cache: catalogCache,
});

export const friends = got.extend({
  prefixUrl: 'https://friends.roproxy.com/',
  responseType: 'json',
  cache: catalogCache,
});
export const thumbnails = got.extend({
  prefixUrl: 'https://thumbnails.roproxy.com/',
  responseType: 'json',
  cache: thumbnailsCache,
});

export const users = got.extend({
  prefixUrl: 'https://users.roproxy.comß/',
  responseType: 'json',
  cache: usersCache,
});
