/*
  Warnings:

  - You are about to drop the column `password` on the `EmailProvider` table. All the data in the column will be lost.
  - You are about to drop the column `myFavoriteListId` on the `MyFavorite` table. All the data in the column will be lost.
  - You are about to drop the `MyFavoriteList` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `passwordhash` to the `EmailProvider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `MyFavorite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MyFavorite" DROP CONSTRAINT "MyFavorite_myFavoriteListId_fkey";

-- AlterTable
ALTER TABLE "EmailProvider" DROP COLUMN "password",
ADD COLUMN     "passwordhash" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MyFavorite" DROP COLUMN "myFavoriteListId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "surname" TEXT;

-- DropTable
DROP TABLE "MyFavoriteList";

-- CreateTable
CREATE TABLE "MyTempFavoriteList" (
    "id" TEXT NOT NULL,
    "ceatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MyTempFavoriteList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MyTempFavorite" (
    "id" TEXT NOT NULL,
    "ceatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "myFavoriteListId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "MyTempFavorite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MyFavorite" ADD CONSTRAINT "MyFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MyTempFavorite" ADD CONSTRAINT "MyTempFavorite_myFavoriteListId_fkey" FOREIGN KEY ("myFavoriteListId") REFERENCES "MyTempFavoriteList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MyTempFavorite" ADD CONSTRAINT "MyTempFavorite_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
