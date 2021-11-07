/* eslint-disable max-len */
import {api} from '../api';
import * as Bluebird from 'bluebird';

interface AxiosResponse {
  data: any,
  request: object,
}

/**
 * @param {string} placeId
 * @return {Bluebird<Number>}
*/
export default function getUniverseId(placeId: number | string): Promise<number> {
  return new Bluebird(async (resolve, reject) => {
    const data: AxiosResponse = await api.get(`universes/get-universe-containing-place?placeid=${placeId}`);

    if (data.data.success) {
      resolve(data.data.universeId);
    } else {
      reject(new Error(data.data.errors[0].message));
    }
  });
}
