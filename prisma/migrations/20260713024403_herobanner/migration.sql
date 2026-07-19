-- CreateTable
CREATE TABLE "HeroBanner" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "brandIconURL" TEXT,
    "productId" INTEGER NOT NULL,
    "bgColor" TEXT NOT NULL,
    "textColor" TEXT NOT NULL,

    CONSTRAINT "HeroBanner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HeroBanner" ADD CONSTRAINT "HeroBanner_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
