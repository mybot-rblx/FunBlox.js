export {
  OpenCloudClient,
  configureOpenCloud,
  getDefaultOpenCloud,
  setDefaultOpenCloud,
  type OpenCloudOptions,
  type RequestOptions,
} from './client';

import { getDefaultOpenCloud } from './client';

/** Configure the default Open Cloud client (API key and/or OAuth token) */
export function setOpenCloudKey(apiKey: string, accessToken?: string) {
  const client = getDefaultOpenCloud();
  client.setApiKey(apiKey);
  if (accessToken) client.setAccessToken(accessToken);
  return client;
}

/** Generic request against any Open Cloud path using the default client */
export function openCloudRequest<T = unknown>(path: string, options?: import('./client').RequestOptions) {
  return getDefaultOpenCloud().request<T>(path, options);
}

/** Shortcuts on the default client (legacy + Open Cloud friendly) */
export const opencloud = {
  get client() {
    return getDefaultOpenCloud();
  },

  // Universes / messaging / data stores
  getUniverse: (universeId: string | number) => getDefaultOpenCloud().getUniverse(universeId),
  publishMessage: (universeId: string | number, topic: string, message: string) =>
    getDefaultOpenCloud().publishMessage(universeId, topic, message),
  listDataStores: (universeId: string | number, maxPageSize?: number, pageToken?: string) =>
    getDefaultOpenCloud().listDataStores(universeId, maxPageSize, pageToken),
  getDataStoreEntry: (universeId: string | number, dataStoreId: string, entryId: string, scope?: string) =>
    getDefaultOpenCloud().getDataStoreEntry(universeId, dataStoreId, entryId, scope),
  setDataStoreEntry: (universeId: string | number, dataStoreId: string, entryId: string, value: unknown, scope?: string) =>
    getDefaultOpenCloud().setDataStoreEntry(universeId, dataStoreId, entryId, value, scope),

  // Users
  getUser: (userId: string | number) => getDefaultOpenCloud().getUser(userId),

  // Groups (Open Cloud equivalents of legacy group methods)
  getGroup: (groupId: string | number) => getDefaultOpenCloud().getGroup(groupId),
  listGroupRoles: (groupId: string | number, maxPageSize?: number, pageToken?: string) =>
    getDefaultOpenCloud().listGroupRoles(groupId, maxPageSize, pageToken),
  listGroupMemberships: (groupId: string | number, maxPageSize?: number, pageToken?: string, filter?: string) =>
    getDefaultOpenCloud().listGroupMemberships(groupId, maxPageSize, pageToken, filter),
  assignRole: (groupId: string | number, membershipId: string, roleId: string | number) =>
    getDefaultOpenCloud().assignRole(groupId, membershipId, roleId),
  unassignRole: (groupId: string | number, membershipId: string, roleId: string | number) =>
    getDefaultOpenCloud().unassignRole(groupId, membershipId, roleId),
  setRank: (groupId: string | number, userId: string | number, roleId: string | number) =>
    getDefaultOpenCloud().setRank(groupId, userId, roleId),
  getGroupShout: (groupId: string | number) => getDefaultOpenCloud().getGroupShout(groupId),
  listJoinRequests: (groupId: string | number, maxPageSize?: number, pageToken?: string) =>
    getDefaultOpenCloud().listJoinRequests(groupId, maxPageSize, pageToken),
  acceptJoinRequest: (groupId: string | number, userId: string | number) =>
    getDefaultOpenCloud().acceptJoinRequest(groupId, userId),
  declineJoinRequest: (groupId: string | number, userId: string | number) =>
    getDefaultOpenCloud().declineJoinRequest(groupId, userId),

  request: openCloudRequest,
};
