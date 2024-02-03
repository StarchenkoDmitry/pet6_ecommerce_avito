-- DropForeignKey
ALTER TABLE "TempFavorite" DROP CONSTRAINT "TempFavorite_tempFavoriteListId_fkey";

-- AddForeignKey
ALTER TABLE "TempFavorite" ADD CONSTRAINT "TempFavorite_tempFavoriteListId_fkey" FOREIGN KEY ("tempFavoriteListId") REFERENCES "TempFavoriteList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
