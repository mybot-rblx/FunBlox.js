/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import {Response} from 'got-cjs';
import {thumbnails} from '../api';
import getUser from './getUser';

interface EligibleSizes {
    body: EligibleSizesData
    bust: EligibleSizesData
    headshot: EligibleSizesData
}

interface EligibleSizesData {
    sizes: Array<string>,
    endpoint: string
}

interface PlayerThumbnail {
    Thumbnail: string
}

const eligibleSizes: EligibleSizes = {
  body: {
    sizes: ['30x30', '48x48', '60x60', '75x75', '100x100', '110x110', '140x140', '150x150', '150x200', '180x180', '250x250', '352x352', '420x420', '720x720'],
    endpoint: 'avatar',
  },
  bust: {
    sizes: ['48x48', '50x50', '60x60', '75x75', '100x100', '150x150', '180x180', '352x352', '420x420'],
    endpoint: 'avatar-bust',
  },
  headshot: {
    sizes: ['48x48', '50x50', '60x60', '75x75', '100x100', '110x110', '150x150', '180x180', '352x352', '420x420', '720x720'],
    endpoint: 'avatar-headshot',
  },
};

/**
 * **getPlayerThumbnail**
 * @param {number | string} user
 * @param {string} size
 * @param {string} format
 * @param {boolean} isCircular
 * @param {string} cropType
 * @return {Promise<PlayerThumbnail>}
 */
export default async function getPlayerThumbnail(user: number | string, size: string, format: string, isCircular: boolean, cropType = 'body'): Promise<PlayerThumbnail> {
  return new Promise(async (resolve, reject) => {
    if (Number(user)) {
      cropType = cropType.toLowerCase();
      if (!Object.keys(eligibleSizes).includes(cropType)) {
        reject(new TypeError(`Invalid cropping type provided: ${cropType} | Use: ${Object.keys(eligibleSizes).join(', ')}`));
      }
      const {sizes, endpoint} = eligibleSizes[cropType];
      // Validate size
      size = size || sizes[sizes.length - 1];
      if (typeof size === 'number') {
        size = `${size}x${size}`;
      }
      if (!sizes.includes(size)) {
        reject(new TypeError(`Invalid size parameter provided: ${size} | [${cropType.toUpperCase()}] Use: ${sizes.join(', ')}`));
      }
      if (format.toLowerCase() !== 'png' && format.toLowerCase() !== 'jpeg') {
        reject(new TypeError(`Invalid image type provided: ${format} | Use: png, jpeg`));
      }

      const avatarResponse: Response<string> = await thumbnails.get(`v1/users/${endpoint}?userIds=${user}&size=${size}&format=${format}&isCircular=${isCircular}`);
      const avatarData = JSON.parse(JSON.stringify(avatarResponse.body));

      return resolve({
        'Thumbnail': avatarData.data[0].imageUrl,
      });
    } else {
      const userData = await getUser(user);
      if (userData.id) {
        const bruh = await getPlayerThumbnail(userData.id, size, format, isCircular, cropType);
        return resolve(bruh);
      } else {
        reject(new Error('User not found'));
      }
    }
  });
}
