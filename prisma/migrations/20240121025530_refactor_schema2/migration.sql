/*
  Warnings:

  - You are about to drop the column `imageId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `avatarImageId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_imageId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "imageId",
ADD COLUMN     "itemImageId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarImageId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "ItemImage" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "buffer" BYTEA NOT NULL,
    "buffer0" BYTEA NOT NULL,
    "buffer1" BYTEA NOT NULL,
    "buffer2" BYTEA NOT NULL,
    "size" INTEGER NOT NULL,
    "size0" INTEGER NOT NULL,
    "size1" INTEGER NOT NULL,
    "size2" INTEGER NOT NULL,

    CONSTRAINT "ItemImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvatarImage" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT,
    "buffer" BYTEA NOT NULL,
    "buffer0" BYTEA NOT NULL,
    "buffer1" BYTEA NOT NULL,
    "size" INTEGER NOT NULL,
    "size0" INTEGER NOT NULL,
    "size1" INTEGER NOT NULL,

    CONSTRAINT "AvatarImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ItemImage_id_key" ON "ItemImage"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AvatarImage_id_key" ON "AvatarImage"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_avatarImageId_fkey" FOREIGN KEY ("avatarImageId") REFERENCES "AvatarImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_itemImageId_fkey" FOREIGN KEY ("itemImageId") REFERENCES "ItemImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
