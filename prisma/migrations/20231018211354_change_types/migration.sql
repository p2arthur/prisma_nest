-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_reservations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "place_id" TEXT NOT NULL,
    "invoice_id" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL
);
INSERT INTO "new_reservations" ("end_date", "id", "invoice_id", "place_id", "start_date", "timestamp") SELECT "end_date", "id", "invoice_id", "place_id", "start_date", "timestamp" FROM "reservations";
DROP TABLE "reservations";
ALTER TABLE "new_reservations" RENAME TO "reservations";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
