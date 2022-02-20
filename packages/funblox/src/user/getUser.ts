/* eslint-disable no-tabs */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import * as Bluebird from 'bluebird';
import {friends, thumbnails, users, api} from '../api';

interface AxiosResponse {
    // `data` is the response that was provided by the server
    data: any,

    // `status` is the HTTP status code from the server response
    status: number,

    // `statusText` is the HTTP status message from the server response
    statusText: string,

    // `headers` the HTTP headers that the server responded with
    // All header names are lower cased and can be accessed using the bracket notation.
    // Example: `response.headers['content-type']`
    headers: object,

    // `config` is the config that was provided to `axios` for the request
    config: object,

    // `request` is the request that generated this response
    // It is the last ClientRequest instance in node.js (in redirects)
    // and an XMLHttpRequest instance in the browser
    request: object
}

interface UserResponse {
    'id': number,
    'username': string,
    'description': string,
    'created': string,
    'avatar_url': string,
    'friends': {
        'count': number,
        'ids': Array<number>
    },
    'followers': {
        'count': number,
        'ids': Array<number>
    },
    'following': {
        'count': number,
        'ids': Array<number>
    }
}

/**
 *
 * @param {number | string} identifier
 * @return {Promise<UserResponse>}
 */
export default async function getUserDetails(identifier: number | string): Promise<UserResponse> {
  return new Bluebird(async (resolve, reject) => {
    if (Number(identifier)) {
      const userid = Number(identifier);

      const basicData: AxiosResponse = await users.get(`v1/users/${userid}/`);
      const followersResponse: AxiosResponse = await friends.get(`v1/users/${userid}/followers`);
      const friendsResponse: AxiosResponse = await friends.get(`v1/users/${userid}/friends`);
      const followingResponse: AxiosResponse = await friends.get(`v1/users/${userid}/followings`);
      const avatarResponse: AxiosResponse = await thumbnails.get(`v1/users/avatar?userIds=${userid}&size=720x720&format=Png&isCircular=false`);

      // Counter for followings, friends and followers
      const followingCountResponse: AxiosResponse = await friends.get(`v1/users/${userid}/followings/count`);
      const friendsCountResponse: AxiosResponse = await friends.get(`v1/users/${userid}/friends/count`);
      const followersCountResponse: AxiosResponse = await friends.get(`v1/users/${userid}/followers/count`);

      // Use raw data to get the numbers
      const followingCount: number = followingCountResponse.data.count;
      const friendsCount: number = friendsCountResponse.data.count;
      const followersCount: number = followersCountResponse.data.count;

      const followersArr = [];
      followersResponse.data.data.forEach((user) => {
        followersArr.push(user.id);
      });
      const friendsArr = [];
      friendsResponse.data.data.forEach((user) => {
        friendsArr.push(user.id);
      });
      const followingArr = [];
      followingResponse.data.data.forEach((user) => {
        followingArr.push(user.id);
      });

      return {
        'id': basicData.data.id,
        'username': basicData.data.name,
        'description': basicData.data.description,
        'created': basicData.data.created,
        'avatar_url': avatarResponse.data.data[0].imageUrl,
        'friends': {
          'count': friendsCount,
          'ids': friendsArr,
        },
        'followers': {
          'count': followersCount,
          'ids': followersArr,
        },
        'following': {
          'count': followingCount,
          'ids': followingArr,
        },
      };
    } else {
      const response: AxiosResponse = await api.get(`users/get-by-username?username=${identifier}`);

      if (response.data.success === false) return reject(new Error('Not found. - getUser.js'));

      getUserDetails(response.data.Id).then(resolve).catch(reject);
    }
  });
}
