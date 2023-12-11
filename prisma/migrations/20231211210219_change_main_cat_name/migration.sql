/*
  Warnings:

  - You are about to drop the `MainCat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "MainCat_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MainCat";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "MainCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SubCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "mainCategoryId" INTEGER NOT NULL,
    CONSTRAINT "SubCategory_mainCategoryId_fkey" FOREIGN KEY ("mainCategoryId") REFERENCES "MainCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SubCategory" ("id", "mainCategoryId", "name") SELECT "id", "mainCategoryId", "name" FROM "SubCategory";
DROP TABLE "SubCategory";
ALTER TABLE "new_SubCategory" RENAME TO "SubCategory";
CREATE UNIQUE INDEX "SubCategory_name_key" ON "SubCategory"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "MainCategory_name_key" ON "MainCategory"("name");
