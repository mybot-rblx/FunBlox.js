/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {games} from '../api';
import * as Promise from 'bluebird';

// Error Messages
const notUniversalId = 'Number is not a universe id, use getUniverseId() to get the universe id.';

export default function getGameVotes(id: number | string) {
  function statusIs500(status: number) {
    if (status == 500 || 501 || 502 || 503 || 504) {
      return true;
    } else {
      return false;
    }
  }
  return new Promise(async function(resolve, reject) {
    if (Number(id)) {
      const data = await games.get(`v1/games/votes?universeIds=${id}`);
      if (statusIs500(data.status)) {
        reject(data.status);
      }

      if (!data.data[0]) {
        reject(notUniversalId);
      }

      return resolve({
        upVotes: data.data[0].upVotes,
        downVotes: data.data[0].downVotes,
      });
    }
  });
}
