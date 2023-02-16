/*
  Warnings:

  - You are about to drop the column `userId` on the `Link` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Link" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "name" TEXT,
    "image" TEXT,
    "icon" TEXT
);
INSERT INTO "new_Link" ("description", "icon", "id", "image", "name", "title", "url") SELECT "description", "icon", "id", "image", "name", "title", "url" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
CREATE UNIQUE INDEX "Link_url_key" ON "Link"("url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
