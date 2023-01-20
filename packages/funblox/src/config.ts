/* eslint-disable require-jsdoc */
import type { FunbloxOptions } from './index';
let wow: FunbloxOptions = { openCloudAPIKey: null, cookie: null };

export function readConfig(): FunbloxOptions {
  return wow;
}

export function writeConfig(options: FunbloxOptions): void {
  wow = options;
}
