/*
  Warnings:

  - You are about to drop the column `type` on the `AvatarImage` table. All the data in the column will be lost.
  - Added the required column `buffer0` to the `AvatarImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buffer1` to the `AvatarImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size0` to the `AvatarImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size1` to the `AvatarImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buffer3` to the `ItemImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size3` to the `ItemImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AvatarImage" DROP COLUMN "type",
ADD COLUMN     "buffer0" BYTEA NOT NULL,
ADD COLUMN     "buffer1" BYTEA NOT NULL,
ADD COLUMN     "size0" INTEGER NOT NULL,
ADD COLUMN     "size1" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ItemImage" ADD COLUMN     "buffer3" BYTEA NOT NULL,
ADD COLUMN     "size3" INTEGER NOT NULL;
