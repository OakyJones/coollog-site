-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cvr" TEXT,
    "branchCode" TEXT,
    "branchText" TEXT,
    "domain" TEXT,
    "logo" TEXT,
    "color" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "rejectedNote" TEXT,
    "approvedAt" DATETIME,
    "approvedBy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Company" ("color", "createdAt", "domain", "id", "logo", "name", "updatedAt") SELECT "color", "createdAt", "domain", "id", "logo", "name", "updatedAt" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE UNIQUE INDEX "Company_cvr_key" ON "Company"("cvr");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
