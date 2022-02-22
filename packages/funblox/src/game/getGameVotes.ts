/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {games} from '../api';
// Types
interface VotesData {
    upVotes: number;
    downVotes: number;
}

// Error Messages
const notUniversalId = 'Number is not a universe id, use getUniverseId() to get the universe id.';

export default function getGameVotes(id: number | string): Promise<VotesData> {
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
        reject(new Error(`${data.status}: ${data.statusText}`));
      }

      if (!data.data[0]) {
        reject(new TypeError(notUniversalId));
      }

      return resolve({
        upVotes: data.data[0].upVotes,
        downVotes: data.data[0].downVotes,
      });
    }
  });
}
