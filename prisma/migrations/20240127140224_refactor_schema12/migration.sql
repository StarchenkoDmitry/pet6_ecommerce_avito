/*
  Warnings:

  - You are about to drop the column `imageId` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_imageId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "imageId",
ADD COLUMN     "mainImageId" TEXT;

-- AlterTable
ALTER TABLE "ItemImage" ADD COLUMN     "itemId" TEXT;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_mainImageId_fkey" FOREIGN KEY ("mainImageId") REFERENCES "ItemImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemImage" ADD CONSTRAINT "ItemImage_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
