export interface SearchUserAPIResponse {
  data: Array<{
    requestedUsername: string
    hasVerifiedBadge: boolean,
    id: number,
    name: string
    displayName: string
  }>;
}