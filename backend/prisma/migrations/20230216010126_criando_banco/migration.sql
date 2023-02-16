-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "url" TEXT,
    "description" TEXT,
    "name" TEXT,
    "image" TEXT,
    "icon" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_url_key" ON "Link"("url");
