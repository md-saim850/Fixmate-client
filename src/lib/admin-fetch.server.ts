import "server-only";

import { getToken } from "./getToken";
import { adminFetchCore } from "./admin-fetch-core";

export async function adminFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getToken();

  return adminFetchCore<T>(endpoint, token, options);
}