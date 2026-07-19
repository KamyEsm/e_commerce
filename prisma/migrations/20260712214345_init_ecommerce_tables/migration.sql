/*
  Warnings:

  - You are about to drop the column `roleId` on the `Member` table. All the data in the column will be lost.
  - The primary key for the `RoleOnMember` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `memberid` on the `RoleOnMember` table. All the data in the column will be lost.
  - You are about to drop the column `roleid` on the `RoleOnMember` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Email]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `memberId` to the `RoleOnMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `RoleOnMember` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Size" AS ENUM ('Xsmall', 'small', 'medium', 'large', 'Xlarge', 'XXlarge', 'XXXlarge', 'XXXXlarge');

-- CreateEnum
CREATE TYPE "Color" AS ENUM ('red', 'yellow', 'blue');

-- DropForeignKey
ALTER TABLE "RoleOnMember" DROP CONSTRAINT "RoleOnMember_memberid_fkey";

-- DropForeignKey
ALTER TABLE "RoleOnMember" DROP CONSTRAINT "RoleOnMember_roleid_fkey";

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "roleId";

-- AlterTable
ALTER TABLE "RoleOnMember" DROP CONSTRAINT "RoleOnMember_pkey",
DROP COLUMN "memberid",
DROP COLUMN "roleid",
ADD COLUMN     "memberId" INTEGER NOT NULL,
ADD COLUMN     "roleId" INTEGER NOT NULL,
ADD CONSTRAINT "RoleOnMember_pkey" PRIMARY KEY ("memberId", "roleId");

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "size" "Size" NOT NULL DEFAULT 'medium',
    "color" "Color" NOT NULL DEFAULT 'red',
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "productId" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("memberId","productId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_Email_key" ON "Member"("Email");

-- AddForeignKey
ALTER TABLE "RoleOnMember" ADD CONSTRAINT "RoleOnMember_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleOnMember" ADD CONSTRAINT "RoleOnMember_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
