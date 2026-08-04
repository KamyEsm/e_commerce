/*
  Warnings:

  - You are about to drop the column `Email` on the `Member` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Member_Email_key";

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "Email",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "emailVerification" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phoneNumberVerification" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");
