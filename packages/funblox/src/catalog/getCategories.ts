/* eslint-disable require-jsdoc */
import {catalog} from '../api';

export default function getCategories(): Promise<Object> {
  return new Promise(async (resolve, reject) => {
    try {
      const categories = catalog.get('v1/categories');

      resolve(categories.json());
    } catch (e) {
      reject(e);
    }
  });
}
