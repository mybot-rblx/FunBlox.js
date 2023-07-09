export interface SearchUserAPIResponse {
  data: Array<{
    requestedUsername: string
    hasVerifiedBadge: boolean,
    id: number,
    name: string
    displayName: string
  }>;
}

export type GroupGamesAPIResponse = {
  previousPageCursor: null,
  nextPageCursor: null,
  data: Array<{
    id: number,
    name: string,
    description: string,
    creator: {
      id: number,
      type: string
    },
    rootPlace: {
      id: 16207344,
      type: "Place"
    },
    created: string,
    updated: string,
    placeVisits: number
  }>;
}