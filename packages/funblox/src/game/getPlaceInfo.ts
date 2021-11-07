import {games, thumbnails} from '../api';
import * as Promise from 'bluebird';

interface GameData {
  id: number,
  name: string,
  description: string,
  creator: OwnerObject,
  thumbnails: string,
  price: number,
  allowedGearGenres: string,
  allowedGearCategories: string,
  playing: number,
  visits: number,
  maxPlayers: number,
  created: string,
  updated: string,
  genres: string,
  favoritedCount: number,

}

interface OwnerObject {
  id: number,
  name: string,
  type: string,
  isRNVAccount: boolean,
}

interface AxiosResponse {
  data: any,
  status: number,
  statusText: string,
  headers: object,
  config: object,
  request: object
}
/**
 *
 * @param {number} identifier
 * @return {Promise<GameData>}
 */
export default function(identifier: number): Promise<GameData> {
  // eslint-disable-next-line require-jsdoc
  async function wow(identifier: number) {
    // eslint-disable-next-line max-len
    const gameData: AxiosResponse = await games.get(`v1/games?universeIds=${identifier}`);
    // eslint-disable-next-line max-len
    const thumbnailresponse: AxiosResponse = await thumbnails.get(`v1/places/gameicons?placeIds=${identifier}&size=128x128&format=Jpeg&isCircular=true`);
    const returnable = {
      id: gameData.data.id || null,
      name: gameData.data.name || null,
      description: gameData.data.description || null,
      creator: gameData.data.creator || null,
      thumbnails: thumbnailresponse.data.imageUrl || null,
      price: gameData.data.price || null,
      allowedGearGenres: gameData.data.allowedGearGenres || null,
      allowedGearCategories: gameData.data.allowedGearCategories || null,
      playing: gameData.data.playing || null,
      visits: gameData.data.visits || null,
      maxPlayers: gameData.data.maxPlayers || null,
      created: gameData.data.created || null,
      updated: gameData.data.updated || null,
      genres: gameData.data.genres || null,
      favoritedCount: gameData.data.favoritedCount || null,
    };
    return returnable;
  }
  return new Promise((resolve, reject) => {
    if (Number(identifier)) {
      wow(identifier).then(resolve).catch(reject);
    } else {
      return reject(
          new Error('Invalid identifier, it should be a number not a string.'),
      );
    }
  });
}
