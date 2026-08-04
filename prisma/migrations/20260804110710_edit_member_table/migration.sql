/*
  Warnings:

  - You are about to drop the column `hasshedPass` on the `Member` table. All the data in the column will be lost.
  - Added the required column `hashedPass` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "hasshedPass",
ADD COLUMN     "hashedPass" TEXT NOT NULL;
