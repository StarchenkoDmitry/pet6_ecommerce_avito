/*
  Warnings:

  - You are about to drop the column `itemImageId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `avatarImageId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_itemImageId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_avatarImageId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "itemImageId",
ADD COLUMN     "imageId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatarImageId",
ADD COLUMN     "imageId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "AvatarImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "ItemImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
