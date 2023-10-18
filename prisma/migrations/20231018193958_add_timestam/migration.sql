/*
  Warnings:

  - Added the required column `timestamp` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "AbstractDocument" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_reservations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "place_id" TEXT NOT NULL,
    "invoice_id" TEXT NOT NULL,
    "timestamp" INTEGER NOT NULL
);
INSERT INTO "new_reservations" ("end_date", "id", "invoice_id", "place_id", "start_date") SELECT "end_date", "id", "invoice_id", "place_id", "start_date" FROM "reservations";
DROP TABLE "reservations";
ALTER TABLE "new_reservations" RENAME TO "reservations";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
