/* eslint-disable max-len */
import * as Bluebird from 'bluebird';
import {catalog} from '../api';

/**
 *
 * @param {number | string} bundleId
 * @return {Promise<string>}
 */
export default function getFavoritesOfBundle(bundleId: number | string): Promise<string> {
  return new Bluebird(async (resolve, reject) => {
    if (Number(bundleId)) {
      try {
        const favorites = await catalog.get(`v1/favorites/bundles/${bundleId}/count`);
        resolve(favorites.data);
      } catch (error) {
        reject(error);
      }
    } else {
      reject(new Error('Item ID must be a number'));
    }
  });
}
