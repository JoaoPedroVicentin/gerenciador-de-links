/*
  Warnings:

  - Added the required column `userId` to the `Link` table without a default value. This is not possible if the table is not empty.
  - Made the column `url` on table `Link` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Link" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "name" TEXT,
    "image" TEXT,
    "icon" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Link_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Link" ("description", "icon", "id", "image", "name", "title", "url") SELECT "description", "icon", "id", "image", "name", "title", "url" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
CREATE UNIQUE INDEX "Link_url_key" ON "Link"("url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
