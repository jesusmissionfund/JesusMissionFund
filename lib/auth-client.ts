import { serviceUnreachable } from "./action-result";
import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

import { ac, roles } from "./permissions";

export const authClient = createAuthClient({
  plugins: [adminClient({ ac, roles })],
});

export async function authErrorOf(
  request: () => Promise<{ error: { message?: string } | null }>,
  fallback: string,
) {
  try {
    const { error } = await request();
    return error ? error.message || fallback : "";
  } catch {
    return serviceUnreachable;
  }
}
