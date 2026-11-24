import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getServerToken = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  if (!token) {
    throw new Error("Unauthorized");
  }

  return token;
};