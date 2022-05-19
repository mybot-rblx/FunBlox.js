/* eslint-disable max-len */
import { Response } from 'got-cjs';
import { games, thumbnails } from '../api';

interface GameData {
  id: number;
  name: string;
  description: string;
  creator: OwnerObject;
  thumbnails: string;
  price: number;
  allowedGearGenres: string;
  allowedGearCategories: string;
  playing: number;
  visits: number;
  maxPlayers: number;
  created: string;
  updated: string;
  genres: string;
  favoritedCount: number;
}

interface OwnerObject {
  id: number;
  name: string;
  type: string;
  isRNVAccount: boolean;
}

/**
 *
 * @param {number} identifier
 * @return {Promise<GameData>}
 */
export default function (identifier: number): Promise<GameData> {
  // eslint-disable-next-line require-jsdoc
  return new Promise(async (resolve, reject) => {
    if (Number(identifier)) {
      const gameData: Response<string> = await games.get(
        `v1/games?universeIds=${identifier}`,
      );
      const thumbnailresponse: Response<string> = await thumbnails.get(
        `v1/places/gameicons?placeIds=${identifier}&size=128x128&format=Jpeg&isCircular=true`,
      );
      const game = JSON.parse(JSON.stringify(gameData.body));
      const thumbnail = JSON.parse(JSON.stringify(thumbnailresponse.body));
      resolve({
        id: game.id || null,
        name: game.name || null,
        description: game.description || null,
        creator: game.creator || null,
        thumbnails: thumbnail.imageUrl || null,
        price: game.price || null,
        allowedGearGenres: game.allowedGearGenres || null,
        allowedGearCategories: game.allowedGearCategories || null,
        playing: game.playing || null,
        visits: game.visits || null,
        maxPlayers: game.maxPlayers || null,
        created: game.created || null,
        updated: game.updated || null,
        genres: game.genres || null,
        favoritedCount: game.favoritedCount || null,
      });
    } else {
      return reject(
        new Error('Invalid identifier, it should be a number not a string.'),
      );
    }
  });
}
