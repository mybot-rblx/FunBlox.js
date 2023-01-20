/* eslint-disable require-jsdoc */
import * as api from './api';
import { writeConfig } from './config';
import getCurrentUser from './utils/getCurrentUser';

export {
  api,
};

export declare interface FunbloxOptions {
    openCloudAPIKey?: string;
    cookie?: string;
}

export default class FunBlox {
  options: FunbloxOptions;
  constructor(options?: FunbloxOptions) {
    if (options) {
      writeConfig(options);
      if (options.cookie) {
        getCurrentUser(options.cookie);
      }
    }
  }
  public user = import('./user/');
  public group = import('./group/');
  public catalog = import('./catalog/');
  public game = import('./game/');
}
