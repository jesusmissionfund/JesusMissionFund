-- AlterEnum
ALTER TYPE "AuditAction" ADD VALUE 'REPORT_REQUESTED';

-- CreateTable
CREATE TABLE "report_request" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "report_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "missionary_report" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "requestId" TEXT,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "missionary_report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "report_request_userId_idx" ON "report_request"("userId");

-- CreateIndex
CREATE INDEX "report_request_createdAt_idx" ON "report_request"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "missionary_report_requestId_key" ON "missionary_report"("requestId");

-- CreateIndex
CREATE INDEX "missionary_report_userId_idx" ON "missionary_report"("userId");

-- CreateIndex
CREATE INDEX "missionary_report_createdAt_idx" ON "missionary_report"("createdAt");

-- AddForeignKey
ALTER TABLE "report_request" ADD CONSTRAINT "report_request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "missionary_report" ADD CONSTRAINT "missionary_report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "missionary_report" ADD CONSTRAINT "missionary_report_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "report_request"("id") ON DELETE SET NULL ON UPDATE CASCADE;

