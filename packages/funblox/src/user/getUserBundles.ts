/* eslint-disable max-len */
import {catalog} from '../api';

interface AxiosResponse {
    // `data` is the response that was provided by the server
    data: any,

    // `status` is the HTTP status code from the server response
    status: number,

    // `statusText` is the HTTP status message from the server response
    statusText: string,

    // `headers` the HTTP headers that the server responded with
    // All header names are lower cased and can be accessed using the bracket notation.
    // Example: `response.headers['content-type']`
    headers: object,

    // `config` is the config that was provided to `axios` for the request
    config: object,

    // `request` is the request that generated this response
    // It is the last ClientRequest instance in node.js (in redirects)
    // and an XMLHttpRequest instance in the browser
    request: object
}

interface Bundle {
  id: number,
  name: string,
  bundleType: string,
  creator: BundleCreator
}

interface BundleCreator {
    id: number,
    name: string,
    type: string
}
/**
 *
 * @param {string | number} userId
 * @return {Promise<Array<any>>}
 */
export default function getUserBundles(userId: string | number): Promise<Bundle> {
  return new Promise(async (resolve, reject) => {
    try {
      const result: AxiosResponse = await catalog.get(`v1/users/${Number(userId)}/bundles`);

      resolve(result.data.data);
    } catch (error) {
      reject(error);
    }
  });
}
