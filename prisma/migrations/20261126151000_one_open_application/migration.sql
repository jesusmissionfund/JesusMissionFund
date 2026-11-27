-- CreateIndex
CREATE UNIQUE INDEX "missionary_application_one_open_per_user" ON "missionary_application"("userId") WHERE (status <> 'REJECTED');
