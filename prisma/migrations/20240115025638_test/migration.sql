-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_imageId_fkey";

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "imageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
