/*
  Warnings:

  - You are about to alter the column `qty` on the `AccountRow` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AccountRow" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" REAL NOT NULL DEFAULT 0,
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
