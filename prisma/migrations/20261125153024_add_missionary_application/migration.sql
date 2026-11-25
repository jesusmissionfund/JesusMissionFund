-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "missionary_application" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'DRAFT',
    "phone" TEXT,
    "country" TEXT,
    "region" TEXT,
    "church" TEXT,
    "yearsServing" INTEGER,
    "ministryFocus" TEXT,
    "submittedAt" TIMESTAMP(3),
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "missionary_application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "missionary_application_userId_key" ON "missionary_application"("userId");

-- CreateIndex
CREATE INDEX "missionary_application_status_idx" ON "missionary_application"("status");

-- AddForeignKey
ALTER TABLE "missionary_application" ADD CONSTRAINT "missionary_application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
