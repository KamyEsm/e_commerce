/*
  Warnings:

  - You are about to drop the column `firstname` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `Member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "firstname",
DROP COLUMN "lastname",
ADD COLUMN     "name" TEXT,
ADD COLUMN     "phonenumber" TEXT;
