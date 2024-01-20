/*
  Warnings:

  - You are about to drop the `MyFavorite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MyTempFavorite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MyTempFavoriteList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MyFavorite" DROP CONSTRAINT "MyFavorite_itemId_fkey";

-- DropForeignKey
ALTER TABLE "MyFavorite" DROP CONSTRAINT "MyFavorite_userId_fkey";

-- DropForeignKey
ALTER TABLE "MyTempFavorite" DROP CONSTRAINT "MyTempFavorite_itemId_fkey";

-- DropForeignKey
ALTER TABLE "MyTempFavorite" DROP CONSTRAINT "MyTempFavorite_myFavoriteListId_fkey";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "MyFavorite";

-- DropTable
DROP TABLE "MyTempFavorite";

-- DropTable
DROP TABLE "MyTempFavoriteList";

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "ceatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TempFavoriteList" (
    "id" TEXT NOT NULL,
    "ceatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TempFavoriteList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TempFavorite" (
    "id" TEXT NOT NULL,
    "ceatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tempFavoriteListId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "TempFavorite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TempFavorite" ADD CONSTRAINT "TempFavorite_tempFavoriteListId_fkey" FOREIGN KEY ("tempFavoriteListId") REFERENCES "TempFavoriteList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TempFavorite" ADD CONSTRAINT "TempFavorite_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
