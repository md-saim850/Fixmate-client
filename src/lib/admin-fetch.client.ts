"use client";

import { getClientToken } from "./get-client-token";
import { adminFetchCore } from "./admin-fetch-core";

export async function adminFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getClientToken();

  return adminFetchCore<T>(endpoint, token, options);
}