/*
  Warnings:

  - You are about to drop the column `discountRate` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the `_CampaignToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CampaignToProduct" DROP CONSTRAINT "_CampaignToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_CampaignToProduct" DROP CONSTRAINT "_CampaignToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "discountRate";

-- DropTable
DROP TABLE "_CampaignToProduct";

-- CreateTable
CREATE TABLE "ProductsOnCampaigns" (
    "productId" INTEGER NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "discountRate" INTEGER NOT NULL,

    CONSTRAINT "ProductsOnCampaigns_pkey" PRIMARY KEY ("productId","campaignId")
);

-- AddForeignKey
ALTER TABLE "ProductsOnCampaigns" ADD CONSTRAINT "ProductsOnCampaigns_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnCampaigns" ADD CONSTRAINT "ProductsOnCampaigns_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
