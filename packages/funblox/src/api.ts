import got from 'got-cjs';
import jar from './utils/jar';
import { webCache } from './utils/caches';

export const api = got.extend({
  prefixUrl: 'https://api.roblox.com/',
  responseType: 'json',
  cookieJar: jar,
  cache: webCache,
});

export const economy = got.extend({
  prefixUrl: 'https://economy.roblox.com/',
  responseType: 'json',
  cookieJar: jar,
  cache: webCache,
});

export const auth = got.extend({
  prefixUrl: 'https://auth.roblox.com/',
  responseType: 'json',
  cookieJar: jar,
  cache: webCache,
});

export const groups = got.extend({
  prefixUrl: 'https://groups.roblox.com/',
  responseType: 'json',
  cookieJar: jar,
  cache: webCache,
});

export const games = got.extend({
  prefixUrl: 'https://games.roblox.com/',
  responseType: 'json',
  cookieJar: jar,
  cache: webCache,
});

export const catalog = got.extend({
  prefixUrl: 'https://catalog.roblox.com/',
  responseType: 'json',
  cookieJar: jar,
  cache: webCache,
});

export const friends = got.extend({
  prefixUrl: 'https://friends.roblox.com/',
  responseType: 'json',
  cookieJar: jar,
  cache: webCache,
});
export const thumbnails = got.extend({
  prefixUrl: 'https://thumbnails.roblox.com/',
  responseType: 'json',
  cookieJar: jar,
  cache: webCache,
});

export const users = got.extend({
  prefixUrl: 'https://users.roblox.com/',
  responseType: 'json',
  cookieJar: jar,
  cache: webCache,
});

export const mobileAPI = got.extend({
  prefixUrl: 'https://www.roblox.com/mobileapi/',
  responseType: 'json',
  cookieJar: jar,
  cache: webCache,
});
