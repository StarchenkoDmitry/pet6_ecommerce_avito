import { Chat, Item, User } from "@prisma/client";

export type ChatWithItem = Chat & { 
    item: Item | null 
} & {
    chatUsers:{
        id:string;
        user:Pick<User,"id" | "imageId" | "name" | 'surname'>
    }[]
};
