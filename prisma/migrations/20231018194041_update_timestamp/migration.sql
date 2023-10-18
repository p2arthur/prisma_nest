/*
  Warnings:

  - You are about to alter the column `timestamp` on the `reservations` table. The data in that column could be lost. The data in that column will be cast from `Int` to `DateTime`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_reservations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "place_id" TEXT NOT NULL,
    "invoice_id" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL
);
INSERT INTO "new_reservations" ("end_date", "id", "invoice_id", "place_id", "start_date", "timestamp") SELECT "end_date", "id", "invoice_id", "place_id", "start_date", "timestamp" FROM "reservations";
DROP TABLE "reservations";
ALTER TABLE "new_reservations" RENAME TO "reservations";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
