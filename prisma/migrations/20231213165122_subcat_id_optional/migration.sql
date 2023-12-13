-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Asset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "sourceId" TEXT,
    "sourceName" TEXT,
    "price" REAL NOT NULL DEFAULT 0,
    "subCategoryId" INTEGER,
    CONSTRAINT "Asset_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Asset" ("id", "name", "price", "sourceId", "sourceName", "subCategoryId") SELECT "id", "name", "price", "sourceId", "sourceName", "subCategoryId" FROM "Asset";
DROP TABLE "Asset";
ALTER TABLE "new_Asset" RENAME TO "Asset";
CREATE UNIQUE INDEX "Asset_name_key" ON "Asset"("name");
CREATE UNIQUE INDEX "Asset_sourceId_key" ON "Asset"("sourceId");
CREATE UNIQUE INDEX "Asset_sourceName_key" ON "Asset"("sourceName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
