/*
  Warnings:

  - You are about to drop the column `mimetype` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `originalname` on the `Image` table. All the data in the column will be lost.
  - Added the required column `type` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "mimetype",
DROP COLUMN "originalname",
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "imageId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
