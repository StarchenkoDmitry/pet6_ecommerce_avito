/*
  Warnings:

  - You are about to drop the column `buffer0` on the `AvatarImage` table. All the data in the column will be lost.
  - You are about to drop the column `buffer1` on the `AvatarImage` table. All the data in the column will be lost.
  - You are about to drop the column `size0` on the `AvatarImage` table. All the data in the column will be lost.
  - You are about to drop the column `size1` on the `AvatarImage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AvatarImage" DROP COLUMN "buffer0",
DROP COLUMN "buffer1",
DROP COLUMN "size0",
DROP COLUMN "size1";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "description" TEXT;
