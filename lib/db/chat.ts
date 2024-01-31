import db from ".";

import { Chat, Item, User } from "@prisma/client";


export async function findChatByIdAndUserId(chatId:string,userId:string)
:Promise<Chat | null>{
    try {
        const chat = await db.chat.findFirst({
            where:{
                id:chatId,
                chatUsers:{
                    some:{
                        userId
                    }
                }
            }
          });
        return chat;
    } catch (error) {
        console.log("findChatByIdAndUserId error:",error);
        return null;
    }
}

export type ChatWithItem = Chat & { item: Item | null } & {chatUsers:{
    id:string;
    user:Pick<User,"id" | "imageId" | "name" | 'surname'>
}[]};

export async function findChatByIdAndUserIdWithItem(chatId:string,userId:string)
:Promise<ChatWithItem | null>{
    try {
        const chat = await db.chat.findFirst({
            where:{
                id:chatId,
                chatUsers:{
                    some:{
                        userId
                    }
                }
            },
            include:{
                item:true,
                chatUsers:{
                    select:{
                        id:true,
                        user:{
                            select:{
                                id:true,
                                imageId:true,
                                name:true,
                                surname:true,
                            }
                        },
                    },
                    where:{
                        userId:{
                            not:userId
                        }
                    },
                },
            }
        });
        return chat;
    } catch (error) {
        console.log("findChatByIdAndUserId error:",error);
        return null;
    }
}
