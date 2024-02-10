'use server'
import { Message } from "@prisma/client";
import db from "@/db"


export async function createMessage(chatId:string,text:string)
:Promise<Message | undefined>{
    try {
        console.log("createMessage ",chatId,text);
        const user = await db.user.currentUser();
        if(!user) return;

        const messageRes = await db.$transaction(async(ts)=>{
            const chat = await ts.chat.findFirst({
                where:{
                    id:chatId,
                    chatUsers:{
                        some:{
                            userId:user.id
                        }
                    }
                }
            });
            
            if(!chat)return;

            const message = await ts.message.create({
                data:{
                    text:text,
                    userId:user.id,
                    chatId:chat.id,
                }
            });
            return message;
        });

        return messageRes;
    } catch (error) {
        console.log("createMessage error:",error);
        return;
    }
}


export async function deleteMessage(chatId:string,messageId:string)
:Promise<boolean>{
    try {
        console.log("deleteMessage",chatId,messageId);
        const user = await db.user.currentUser();
        if(!user) return false;

        const message = await db.message.delete({
            where:{
                id:messageId,
                chatId:chatId,
                userId:user.id,
            }
        });

        console.log("deleteMessage message:",message);
        return !!message;
    } catch (error) {
        console.log("deleteMessage error:",error);
        return false;
    }
}
