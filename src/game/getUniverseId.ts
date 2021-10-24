import { api } from "../api";
import * as Promise from 'bluebird';

interface AxiosResponse {
  data: any,
  request: object,
}

export default function getUniverseId(placeId: number | string): Promise<number> {
  return new Promise(async (resolve, reject) => {
    const data: AxiosResponse = await api.get(`universes/get-universe-containing-place?placeid=${placeId}`)

    return resolve(data.data.UniverseId)
  })
}
