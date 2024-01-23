-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "lastMessageId" TEXT;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "prevMessageID" TEXT;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_lastMessageId_fkey" FOREIGN KEY ("lastMessageId") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_prevMessageID_fkey" FOREIGN KEY ("prevMessageID") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
