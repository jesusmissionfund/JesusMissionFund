-- DropIndex
DROP INDEX "missionary_application_userId_key";

-- AlterTable
ALTER TABLE "missionary_application" ADD COLUMN "reapplyAfter" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "missionary_application_userId_idx" ON "missionary_application"("userId");
