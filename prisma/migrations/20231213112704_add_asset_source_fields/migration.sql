/*
  Warnings:

  - A unique constraint covering the columns `[sourceId]` on the table `Asset` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sourceName]` on the table `Asset` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Asset" ADD COLUMN "sourceId" TEXT;
ALTER TABLE "Asset" ADD COLUMN "sourceName" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AccountRow" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" INTEGER NOT NULL DEFAULT 0,
    "assetId" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,
    CONSTRAINT "AccountRow_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AccountRow_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AccountRow" ("accountId", "assetId", "id", "qty") SELECT "accountId", "assetId", "id", "qty" FROM "AccountRow";
DROP TABLE "AccountRow";
ALTER TABLE "new_AccountRow" RENAME TO "AccountRow";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Asset_sourceId_key" ON "Asset"("sourceId");

-- CreateIndex
CREATE UNIQUE INDEX "Asset_sourceName_key" ON "Asset"("sourceName");
