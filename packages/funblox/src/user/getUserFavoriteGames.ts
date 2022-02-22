/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {games} from '../api';

interface AxiosResponse {
    data: any;
    status: number;
    statusText: string;
    headers: object;
    config: object;
    response: object;
}

interface Game {
    id: number,
    name: string,
    description: string,
    creator: GameCreator
    rootPlace: PlaceRoot
    created: string,
    updated: string,
    placeVisits: number
}

interface GameCreator {
    id: number,
    type: string,
    name: string
}
interface PlaceRoot {
    id: number,
    type: string,
    name: string
}
/**
 *
 * @param {number | string} userId
 * @param {number} limit
 * @return {Promise<Array<Game>>}
 */
export default function getUserFavoriteGames(userId: number | string, limit: number): Promise<Array<Game>> {
  return new Promise(async (resolve, reject) => {
    if (Number(userId)) {
      try {
        const favoriteGames: AxiosResponse = await games.get(`v2/users/${userId}/favorite/games?accessFilter=All&limit=${limit}&sortOrder=Asc`);

        resolve(favoriteGames.data.data);
      } catch (error) {
        reject(error);
      }
    } else {
      reject(new Error('userId must be a number'));
    }
  });
}
