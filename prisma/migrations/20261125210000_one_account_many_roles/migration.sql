-- CreateEnum
CREATE TYPE "PartnerStatus" AS ENUM ('DRAFT', 'ACTIVE');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "country" TEXT,
ADD COLUMN     "phone" TEXT,
ALTER COLUMN "role" SET DEFAULT 'user';

ALTER TABLE "partner_profile" ADD COLUMN     "status" "PartnerStatus" NOT NULL DEFAULT 'DRAFT';

-- Data: contact details move onto the user (partner profile first, then the missionary application).
UPDATE "user" u SET "phone" = p."phone", "country" = p."country"
FROM "partner_profile" p WHERE p."userId" = u."id";

UPDATE "user" u SET "phone" = COALESCE(u."phone", m."phone"), "country" = COALESCE(u."country", m."country")
FROM "missionary_application" m WHERE m."userId" = u."id";

-- Data: partners who finished sign-up are active.
UPDATE "partner_profile" SET "status" = 'ACTIVE' WHERE "frequency" IS NOT NULL AND "supportInterest" IS NOT NULL;

-- Data: the old role was the person's intent. Keep it as an empty draft before dropping it.
INSERT INTO "partner_profile" ("id", "userId", "updatedAt")
SELECT gen_random_uuid()::text, u."id", CURRENT_TIMESTAMP FROM "user" u
WHERE u."role" = 'partner' AND NOT EXISTS (SELECT 1 FROM "partner_profile" p WHERE p."userId" = u."id");

INSERT INTO "missionary_application" ("id", "userId", "updatedAt")
SELECT gen_random_uuid()::text, u."id", CURRENT_TIMESTAMP FROM "user" u
WHERE u."role" = 'missionary' AND NOT EXISTS (SELECT 1 FROM "missionary_application" m WHERE m."userId" = u."id");

UPDATE "user" SET "role" = 'user' WHERE "role" IN ('missionary', 'partner');

-- AlterTable
ALTER TABLE "partner_profile" DROP COLUMN "country",
DROP COLUMN "phone";
