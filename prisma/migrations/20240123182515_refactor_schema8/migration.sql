/*
  Warnings:

  - You are about to drop the column `lastMessageId` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `lastMessageId` on the `ChatUser` table. All the data in the column will be lost.
  - You are about to drop the column `prevMessageID` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_lastMessageId_fkey";

-- DropForeignKey
ALTER TABLE "ChatUser" DROP CONSTRAINT "ChatUser_lastMessageId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_prevMessageID_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "lastMessageId";

-- AlterTable
ALTER TABLE "ChatUser" DROP COLUMN "lastMessageId";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "prevMessageID";
