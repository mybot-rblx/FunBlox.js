/* eslint-disable max-len */
import { catalog } from '../api';
import { Response } from 'got-cjs';

interface Bundle {
  id: number;
  name: string;
  bundleType: string;
  creator: BundleCreator;
}

interface BundleCreator {
  id: number;
  name: string;
  type: string;
}
/**
 *
 * @param {string | number} userId
 * @return {Promise<Array<any>>}
 */
export default function getUserBundles(
    userId: string | number,
): Promise<Bundle> {
  return new Promise(async (resolve, reject) => {
    try {
      const resultRes: Response<string> = await catalog.get(
          `v1/users/${Number(userId)}/bundles`,
      );
      const result = JSON.parse(JSON.stringify(resultRes.body));

      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
}
