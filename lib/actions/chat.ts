'use server'

import { Chat } from "@prisma/client";
import db from "../db";


export async function createChat(userId:string){
    try {
        // const session = await auth();
        throw "todo";
    } catch (error) {
        return { error: "failed_request" }
    }
}

// const chatRes = await db.$transaction(async(ts)=>{
//     const existChat = await ts.chat.findFirst({
//         where:{
//             chatUsers:{
//                 some:{
//                    userId: 
//                 }
//             }
//         }
//     });
// });


//create a conversation about a product
export async function createChatAboutItem(
    itemId:string,
):Promise<Chat | undefined>{
    try {
        const user = await db.user.currentUser();
        if(!user) return;

        const chatRes = await db.$transaction(async(ts)=>{
            const item = await ts.item.findFirst({
                where:{ id: itemId }
            });
            if(!item)return;

            if(item.userId === user.id)return;

            const existChat = await ts.chat.findFirst({
                where:{
                    AND:[
                        {itemId:itemId},
                        {chatUsers:{some:{userId:user.id}}},
                        {chatUsers:{some:{userId:item.userId}}}
                    ]
                }
            });
            if(existChat)return;

            const createdChat = await ts.chat.create({
                data:{
                    itemId:itemId,
                    chatUsers:{
                        create:[
                            { userId: user.id },
                            { userId: item.userId},
                        ]
                    }
                }
            });
            
            if(createdChat){
                return createdChat;
            }
            else return;
        });
        return chatRes;        
    } catch (error) {
        console.log("createChatAboutItem error:",error);
        return;
    }
}
