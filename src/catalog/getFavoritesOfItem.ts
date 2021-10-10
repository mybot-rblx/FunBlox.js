import * as Promise from 'bluebird';
import { catalog } from '../api';

async function getFavorites(itemId: number | string) {
    const favorites = await catalog.get(`v1/favorites/assets/${itemId}`);

    return favorites.data;
}

export default function getFavoritesOfItem(itemId: number | string): Promise<any> {
    return new Promise(async (resolve, reject) => {
        if (Number(itemId)) {
            try {
                const favorites = await getFavorites(itemId);
                resolve(favorites);
            } catch (error) {
                reject(error);
            }
        } else {
            reject(new Error('Item ID must be a number'));
        }
    });
}