/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {Response} from 'got-cjs';
import {games} from '../api';


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
        const favoriteGamesRes: Response<string> = await games.get(`v2/users/${userId}/favorite/games?accessFilter=All&limit=${limit}&sortOrder=Asc`);
        const favoriteGames = JSON.parse(JSON.stringify(favoriteGamesRes.body));

        resolve(favoriteGames.data);
      } catch (error) {
        reject(error);
      }
    } else {
      reject(new Error('userId must be a number'));
    }
  });
}
