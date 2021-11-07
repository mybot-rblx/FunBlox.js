import * as Promise from 'bluebird';
import { catalog } from '../api';

export default function getFavoritesOfItem(itemId: number | string): Promise<any> {
    return new Promise(async (resolve, reject) => {
        if (Number(itemId)) {
            try {
                const favorites = await catalog.get(`v1/favorites/assets/${Number(itemId)}/count`);
                resolve(favorites.data);
            } catch (error) {
                reject(error);
            }
        } else {
            reject(new Error('Item ID must be a number'));
        }
    });
}