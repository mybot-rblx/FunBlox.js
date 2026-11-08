import got, { OptionsOfJSONResponseBody, Response } from 'got-cjs';

export interface OpenCloudOptions {
  /** Open Cloud API key (sent as `x-api-key`) */
  apiKey?: string;
  /** OAuth 2.0 access token (sent as `Authorization: Bearer ...`) */
  accessToken?: string;
  /** Override base URL (default: https://apis.roblox.com) */
  baseUrl?: string;
  /** Optional default headers */
  headers?: Record<string, string>;
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  /** JSON body */
  body?: unknown;
  /** Query parameters */
  searchParams?: Record<string, string | number | boolean | undefined>;
  /** Extra headers for this request */
  headers?: Record<string, string>;
  /** Force use of API key even if accessToken is set */
  useApiKey?: boolean;
  /** Force use of access token */
  useAccessToken?: boolean;
}

/**
 * Friendly Open Cloud client for apis.roblox.com.
 *
 * Works alongside the existing legacy cookie-based clients.
 * Auth is via API key (`x-api-key`) and/or OAuth Bearer token.
 */
export class OpenCloudClient {
  private apiKey?: string;
  private accessToken?: string;
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(options: OpenCloudOptions = {}) {
    this.apiKey = options.apiKey;
    this.accessToken = options.accessToken;
    this.baseUrl = (options.baseUrl || 'https://apis.roblox.com').replace(/\/$/, '');
    this.defaultHeaders = options.headers || {};
  }

  /** Set or replace the API key */
  setApiKey(apiKey: string): this {
    this.apiKey = apiKey;
    return this;
  }

  /** Set or replace the OAuth access token */
  setAccessToken(accessToken: string): this {
    this.accessToken = accessToken;
    return this;
  }

  /** Clear credentials */
  clearAuth(): this {
    this.apiKey = undefined;
    this.accessToken = undefined;
    return this;
  }

  /**
   * Make a request to any Open Cloud path.
   * @param path Path starting with `/` (e.g. `/cloud/v2/universes/123`)
   */
  async request<T = unknown>(path: string, options: RequestOptions = {}): Promise<T> {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const url = `${this.baseUrl}${cleanPath}`;

    const headers: Record<string, string> = {
      Accept: 'application/json',
      ...this.defaultHeaders,
      ...options.headers,
    };

    // Auth: prefer explicit override, otherwise API key if present, else Bearer
    if (options.useApiKey && this.apiKey) {
      headers['x-api-key'] = this.apiKey;
    } else if (options.useAccessToken && this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    } else if (this.apiKey) {
      headers['x-api-key'] = this.apiKey;
    } else if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    const gotOptions: OptionsOfJSONResponseBody = {
      method: options.method || 'GET',
      responseType: 'json',
      headers,
      searchParams: options.searchParams as any,
    };

    if (options.body !== undefined && options.method && options.method !== 'GET') {
      gotOptions.json = options.body;
    }

    try {
      const response: Response<T> = await got(url, gotOptions);
      return response.body;
    } catch (error: any) {
      // Surface Roblox error body when available
      if (error.response?.body) {
        const err = new Error(
          `Open Cloud request failed [${error.response.statusCode}]: ${JSON.stringify(error.response.body)}`,
        );
        (err as any).statusCode = error.response.statusCode;
        (err as any).body = error.response.body;
        throw err;
      }
      throw error;
    }
  }

  // ── Convenience helpers ──────────────────────────────────────────────

  /** GET /cloud/v2/universes/{universeId} */
  getUniverse(universeId: string | number) {
    return this.request(`/cloud/v2/universes/${universeId}`);
  }

  /** POST /cloud/v2/universes/{universeId}:publishMessage */
  publishMessage(universeId: string | number, topic: string, message: string) {
    return this.request(`/cloud/v2/universes/${universeId}:publishMessage`, {
      method: 'POST',
      body: { topic, message },
    });
  }

  /** GET /cloud/v2/universes/{universeId}/data-stores */
  listDataStores(universeId: string | number, maxPageSize = 10, pageToken?: string) {
    return this.request(`/cloud/v2/universes/${universeId}/data-stores`, {
      searchParams: {
        maxPageSize,
        pageToken,
      },
    });
  }

  /** GET data store entry (v2) */
  getDataStoreEntry(
    universeId: string | number,
    dataStoreId: string,
    entryId: string,
    scope = 'global',
  ) {
    const encodedEntry = encodeURIComponent(entryId);
    const path = scope === 'global' || !scope
      ? `/cloud/v2/universes/${universeId}/data-stores/${encodeURIComponent(dataStoreId)}/entries/${encodedEntry}`
      : `/cloud/v2/universes/${universeId}/data-stores/${encodeURIComponent(dataStoreId)}/scopes/${encodeURIComponent(scope)}/entries/${encodedEntry}`;
    return this.request(path);
  }

  /** Set / update a data store entry (PATCH) */
  setDataStoreEntry(
    universeId: string | number,
    dataStoreId: string,
    entryId: string,
    value: unknown,
    scope = 'global',
  ) {
    const encodedEntry = encodeURIComponent(entryId);
    const path = scope === 'global' || !scope
      ? `/cloud/v2/universes/${universeId}/data-stores/${encodeURIComponent(dataStoreId)}/entries/${encodedEntry}`
      : `/cloud/v2/universes/${universeId}/data-stores/${encodeURIComponent(dataStoreId)}/scopes/${encodeURIComponent(scope)}/entries/${encodedEntry}`;
    return this.request(path, {
      method: 'PATCH',
      body: { value },
    });
  }

  /** GET /cloud/v2/users/{userId} */
  getUser(userId: string | number) {
    return this.request(`/cloud/v2/users/${userId}`);
  }


  // ── Groups (Open Cloud) ──────────────────────────────────────────────

  /** GET /cloud/v2/groups/{groupId} */
  getGroup(groupId: string | number) {
    return this.request(`/cloud/v2/groups/${groupId}`);
  }

  /** GET /cloud/v2/groups/{groupId}/roles */
  listGroupRoles(groupId: string | number, maxPageSize = 50, pageToken?: string) {
    return this.request(`/cloud/v2/groups/${groupId}/roles`, {
      searchParams: { maxPageSize, pageToken },
    });
  }

  /** GET /cloud/v2/groups/{groupId}/memberships */
  listGroupMemberships(groupId: string | number, maxPageSize = 50, pageToken?: string, filter?: string) {
    return this.request(`/cloud/v2/groups/${groupId}/memberships`, {
      searchParams: { maxPageSize, pageToken, filter },
    });
  }

  /**
   * Assign a role to a membership.
   * POST /cloud/v2/groups/{groupId}/memberships/{membershipId}:assignRole
   */
  assignRole(groupId: string | number, membershipId: string, roleId: string | number) {
    return this.request(
      `/cloud/v2/groups/${groupId}/memberships/${membershipId}:assignRole`,
      {
        method: 'POST',
        body: { role: `groups/${groupId}/roles/${roleId}` },
      },
    );
  }

  /**
   * Unassign a role from a membership.
   * POST /cloud/v2/groups/{groupId}/memberships/{membershipId}:unassignRole
   */
  unassignRole(groupId: string | number, membershipId: string, roleId: string | number) {
    return this.request(
      `/cloud/v2/groups/${groupId}/memberships/${membershipId}:unassignRole`,
      {
        method: 'POST',
        body: { role: `groups/${groupId}/roles/${roleId}` },
      },
    );
  }

  /**
   * Convenience: set a user's highest role via Open Cloud.
   * Looks up membership then assigns the role.
   */
  async setRank(groupId: string | number, userId: string | number, roleId: string | number) {
    const memberships: any = await this.listGroupMemberships(
      groupId,
      10,
      undefined,
      `user == 'users/${userId}'`,
    );
    const membership = memberships?.groupMemberships?.[0];
    if (!membership?.path) {
      throw new Error(`No membership found for user ${userId} in group ${groupId}`);
    }
    // path is typically "groups/{groupId}/memberships/{membershipId}"
    const membershipId = membership.path.split('/').pop();
    return this.assignRole(groupId, membershipId, roleId);
  }

  /** GET /cloud/v2/groups/{groupId}/shout (if available) */
  getGroupShout(groupId: string | number) {
    return this.request(`/cloud/v2/groups/${groupId}/shout`);
  }

  /** List join requests */
  listJoinRequests(groupId: string | number, maxPageSize = 25, pageToken?: string) {
    return this.request(`/cloud/v2/groups/${groupId}/join-requests`, {
      searchParams: { maxPageSize, pageToken },
    });
  }

  /** Accept a join request */
  acceptJoinRequest(groupId: string | number, userId: string | number) {
    return this.request(`/cloud/v2/groups/${groupId}/join-requests/${userId}:accept`, {
      method: 'POST',
    });
  }

  /** Decline a join request */
  declineJoinRequest(groupId: string | number, userId: string | number) {
    return this.request(`/cloud/v2/groups/${groupId}/join-requests/${userId}:decline`, {
      method: 'POST',
    });
  }

}


/** Shared default client (optional) */
let defaultClient: OpenCloudClient | null = null;

export function getDefaultOpenCloud(): OpenCloudClient {
  if (!defaultClient) {
    defaultClient = new OpenCloudClient();
  }
  return defaultClient;
}

export function setDefaultOpenCloud(client: OpenCloudClient): void {
  defaultClient = client;
}

export function configureOpenCloud(options: OpenCloudOptions): OpenCloudClient {
  const client = new OpenCloudClient(options);
  setDefaultOpenCloud(client);
  return client;
}
