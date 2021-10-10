import getUser from './user/getUser';
import getGroup from './group/getGroup';
import getUserRank from './user/getUserRank';
import getUserFavoriteGames from './user/getUserFavoriteGames';
import getCategories from './catalog/getCategories';
import getFavoritesOfBundle from './catalog/getFavoritesOfBundle';
import getFavoritesOfItem from './catalog/getFavoritesOfItem';
import getPlayerThumbnail from './user/getPlayerThumbnail';
import * as api from './api'

export {
    getGroup,
    api,
    getUser,
    getUserRank,
    getUserFavoriteGames,
    getFavoritesOfBundle,
    getCategories,
    getPlayerThumbnail,
    getFavoritesOfItem
}
