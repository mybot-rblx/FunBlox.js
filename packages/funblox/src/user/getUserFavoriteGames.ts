import * as Promise from 'bluebird';
import { games } from '../api'

interface AxiosResponse {
    data: any;
    status: number;
    statusText: string;
    headers: object;
    config: object;
    response: object;
}

export default function getUserFavoriteGames(userId: number | string, limit: number): Promise<Array<any>> {
    return new Promise(async (resolve, reject) => {
        if (Number(userId)) {
            try {
                const favoriteGames: AxiosResponse = await games.get(`v2/users/${userId}/favorite/games?accessFilter=All&limit=${limit}&sortOrder=Asc`)

                resolve(favoriteGames.data.data)
            } catch (error) {
                reject(error);
            }
        } else {
            reject(new Error('userId must be a number'));
        }
    });
}