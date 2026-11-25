import { prisma } from "./prisma";

type RateLimitRule = { window: number; max: number };
type Decision = { allowed: boolean; retryAfter: number | null };

// Matches better-auth's `customStorage.consume`, so one table backs its endpoints and the app's server calls.
// Check and increment run as one statement so concurrent requests can't all pass on a stale count.
export async function consumeRateLimit(
  key: string,
  { window, max }: RateLimitRule,
): Promise<Decision> {
  const [row] = await prisma.$queryRaw<{ count: number; retryAfter: number }[]>`
    INSERT INTO "rate_limit" ("key", "count", "windowStart")
    VALUES (${key}, 1, now())
    ON CONFLICT ("key") DO UPDATE SET
      "count" = CASE
        WHEN "rate_limit"."windowStart" <= now() - ${window}::int * interval '1 second' THEN 1
        ELSE "rate_limit"."count" + 1
      END,
      "windowStart" = CASE
        WHEN "rate_limit"."windowStart" <= now() - ${window}::int * interval '1 second' THEN now()
        ELSE "rate_limit"."windowStart"
      END
    RETURNING
      "count",
      ceil(extract(epoch FROM "windowStart" + ${window}::int * interval '1 second' - now()))::int AS "retryAfter"`;

  // Expired windows are dead rows; clearing them now and then keeps the table small without a cron job.
  if (Math.random() < 0.01)
    await prisma.$executeRaw`DELETE FROM "rate_limit" WHERE "windowStart" < now() - interval '1 day'`;

  return row.count <= max
    ? { allowed: true, retryAfter: null }
    : { allowed: false, retryAfter: Math.max(row.retryAfter, 1) };
}
