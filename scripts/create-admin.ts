// Creates a new staff (admin) account. Needed once to bootstrap the first admin; after that, admins add
// staff from /dashboard/admin/users/new.
// Usage: pnpm tsx scripts/create-admin.ts --email you@example.org --password '...' [--name "JMF Support"]
import "dotenv/config";
import { parseArgs } from "node:util";
import { z } from "zod";

import { auth } from "@/lib/auth";

const input = z.object({
  email: z.email("A valid --email is required"),
  password: z.string().min(8, "--password must be at least 8 characters"),
  name: z.string().min(1),
});

const { values } = parseArgs({
  options: {
    email: { type: "string" },
    password: { type: "string" },
    name: { type: "string", default: "JMF Support" },
  },
});

async function main() {
  const parsed = input.safeParse(values);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((issue) => issue.message).join("\n"));
  }

  const { user } = await auth.api.createUser({ body: { ...parsed.data, role: "admin" } });
  console.log(`Created admin ${user.email} (${user.id})`);
}

main()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
