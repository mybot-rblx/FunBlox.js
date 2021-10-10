import * as Promise from 'bluebird';
import { catalog } from '../api';

async function getFavorites(bundleId: number | string) {
    const favorites = await catalog.get(`v1/favorites/bundles/${bundleId}`);

    return favorites.data;
}

export default function getFavoritesOfBundle(bundleId: number | string): Promise<string> {
    return new Promise(async (resolve, reject) => {
        if (Number(bundleId)) {
            try {
                const favorites = await getFavorites(bundleId);
                resolve(favorites);
            } catch (error) {
                reject(error);
            }
        } else {
            reject(new Error('Item ID must be a number'));
        }
    });
}