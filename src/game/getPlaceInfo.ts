import { games, thumbnails } from "../api"
import * as Promise from "bluebird";

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

async function wow(identifier: number) {
  let gameData: AxiosResponse = await games.get(`v1/games?universeIds=${identifier}`);
  let thumbnailresponse: AxiosResponse = await thumbnails.get(`v1/places/gameicons?placeIds=${identifier}&size=128x128&format=Jpeg&isCircular=true`)
  let returnable = {
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
  }
  return returnable;
}

export default function(identifier: number): Promise<GameData> {
  return new Promise((resolve, reject) => {
    if (Number(identifier)) {
      wow(identifier).then(resolve).catch(reject);
    } else {
      return reject("Invalid identifier, it should be a number not a string...");
    }
  })
}
