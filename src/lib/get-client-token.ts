"use client";

import { authClient } from "@/lib/auth-client";

export const getClientToken = async () => {
  const { data, error } = await authClient.token()

  if (error || !data?.token) {
    throw new Error("Unauthorized");
  }

  return data.token;
};