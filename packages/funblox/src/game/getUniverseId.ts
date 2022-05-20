/* eslint-disable max-len */
import { Response } from 'got-cjs';
import { api } from '../api';

/**
 * @param {string} placeId
 * @return {Promise<Number>}
 */
export default function getUniverseId(
    placeId: number | string,
): Promise<number> {
  return new Promise(async (resolve, reject) => {
    const res: Response<string> = await api.get(
        `universes/get-universe-containing-place?placeid=${placeId}`,
    );
    const data = JSON.parse(JSON.stringify(res.body));

    if (data.body.success) {
      resolve(data.data.universeId);
    } else {
      reject(new Error(data.data.errors[0].message));
    }
  });
}
