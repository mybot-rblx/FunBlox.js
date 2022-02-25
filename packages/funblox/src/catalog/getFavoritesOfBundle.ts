/* eslint-disable max-len */
import {catalog} from '../api';

/**
 *
 * @param {number | string} bundleId
 * @return {Promise<string>}
 */
export default function getFavoritesOfBundle(bundleId: number | string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    if (Number(bundleId)) {
      try {
        const favorites = await catalog.get(`v1/favorites/bundles/${bundleId}/count`);
        resolve(JSON.parse(JSON.stringify(favorites.body)));
      } catch (error) {
        reject(error);
      }
    } else {
      reject(new Error('Item ID must be a number'));
    }
  });
}
