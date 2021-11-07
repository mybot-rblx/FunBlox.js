import { games } from "../api";
import * as Promise from "bluebird";

export default function getGameVotes(id: number | string) {
  return new Promise(async (resolve: Promise.resolve, reject: Promise.reject) => {
    if (Number(id)) {
      const data = await games.get(`v1/games/votes?universeIds=${id}`)

      if (!data.data[0]) reject("Number is not a universe id, use getUniverseId() to get the universe id.")

      return resolve({
        upVotes: data.data[0].upVotes,
        downVotes: data.data[0].downVotes
      })
    }
  })
}
