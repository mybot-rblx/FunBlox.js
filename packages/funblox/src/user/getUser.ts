/* eslint-disable no-new-wrappers */
/* eslint-disable no-tabs */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import { Response } from 'got-cjs';
import { friends, thumbnails, users } from '../api';
import getNameFromId from '../utils/getNameFromId';

interface UserResponse {
  id: number;
  username: string;
  description: string;
  created: string;
  avatar_url: string;
  friends: {
    count: number;
    ids: Array<number>;
  };
  followers: {
    count: number;
    ids: Array<number>;
  };
  following: {
    count: number;
    ids: Array<number>;
  };
}

/**
 *
 * @param {number | string} identifier
 * @return {Promise<UserResponse>}
 */
export default async function getUser(
  identifier: number | string,
): Promise<UserResponse> {
  return new Promise(async (resolve, reject) => {
    if (typeof identifier === 'number') {
      const userid = Number(identifier);

      const basicResponse: Response<string> = await users(
        `v1/users/${userid}/`,
      );
      const followersResponse: Response<string> = await friends(
        `v1/users/${userid}/followers`,
      );
      const friendsResponse: Response<string> = await friends(
        `v1/users/${userid}/friends`,
      );
      const followingResponse: Response<string> = await friends(
        `v1/users/${userid}/followings`,
      );
      const avatarResponse: Response<string> = await thumbnails(
        `v1/users/avatar?userIds=${userid}&size=720x720&format=Png&isCircular=false`,
      );

      // Counter for followings, friends and followers
      const followingCountResponse: Response<string> = await friends(
        `v1/users/${userid}/followings/count`,
      );
      const friendsCountResponse: Response<string> = await friends(
        `v1/users/${userid}/friends/count`,
      );
      const followersCountResponse: Response<string> = await friends(
        `v1/users/${userid}/followers/count`,
      );

      // I love parsing.com
      const basicData = JSON.parse(JSON.stringify(basicResponse.body));
      const followersData = JSON.parse(JSON.stringify(followersResponse.body));
      const friendsData = JSON.parse(JSON.stringify(friendsResponse.body));
      const followingData = JSON.parse(JSON.stringify(followingResponse.body));
      const avatarData = JSON.parse(JSON.stringify(avatarResponse.body));

      const followingCountData = JSON.parse(
        JSON.stringify(followingCountResponse.body),
      );
      const friendsCountData = JSON.parse(
        JSON.stringify(friendsCountResponse.body),
      );
      const followersCountData = JSON.parse(
        JSON.stringify(followersCountResponse.body),
      );

      // Use raw data to get the numbers
      const followingCount: number = followingCountData.count;
      const friendsCount: number = friendsCountData.count;
      const followersCount: number = followersCountData.count;

      const followersArr = [];
      followersData.data.forEach((user) => {
        followersArr.push(user.id);
      });
      const friendsArr = [];
      friendsData.data.forEach((user) => {
        friendsArr.push(user.id);
      });
      const followingArr = [];
      followingData.data.forEach((user) => {
        followingArr.push(user.id);
      });

      resolve({
        id: basicData.id,
        username: basicData.name,
        description: basicData.description,
        created: basicData.created,
        avatar_url: avatarData.data[0].imageUrl,
        friends: {
          count: friendsCount,
          ids: friendsArr,
        },
        followers: {
          count: followersCount,
          ids: followersArr,
        },
        following: {
          count: followingCount,
          ids: followingArr,
        },
      });
    } else {
      if (typeof identifier === 'string') {
        const wow = await getNameFromId(identifier);
        const bruh = await getUser(wow);

        resolve(bruh);
      } else {
        reject(new TypeError('Identifier must be a number or a string'));
      }
    }
  });
}
