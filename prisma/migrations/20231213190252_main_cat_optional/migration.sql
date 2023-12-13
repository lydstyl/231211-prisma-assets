-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SubCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "mainCategoryId" INTEGER,
    CONSTRAINT "SubCategory_mainCategoryId_fkey" FOREIGN KEY ("mainCategoryId") REFERENCES "MainCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_SubCategory" ("id", "mainCategoryId", "name") SELECT "id", "mainCategoryId", "name" FROM "SubCategory";
DROP TABLE "SubCategory";
ALTER TABLE "new_SubCategory" RENAME TO "SubCategory";
CREATE UNIQUE INDEX "SubCategory_name_key" ON "SubCategory"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
