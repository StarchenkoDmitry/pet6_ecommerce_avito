/* eslint-disable @next/next/no-img-element */

import { Chat } from '@prisma/client';
import Link from 'next/link';
import React from 'react'


export type ChatWithChatUserAndItem = Chat & {
    chatUsers: {
        user:{
            id: string;
            imageId: string | null;
            name: string;
            surname: string | null;
        }
    }[];
    item: {
        id: string;
        ceatedAt: Date;
        updatedAt: Date;
        lable: string;
        price: number;
        description: string | null;
        mainImageId: string | null;
        userId: string;
    } | null;
}

export interface ChatViewProps {
    chat:ChatWithChatUserAndItem;
}

function ChatView({chat}: ChatViewProps) {
    const { id,item,itemId, chatUsers  } = chat;

    let userAvatarUrl;
    let name;
    if(chatUsers.length > 0){
        userAvatarUrl = chatUsers.length > 0 ?
            chatUsers[0].user.imageId ? 
            `/api/avatar/${chatUsers[0].user.imageId}` : "/img/1.jpg" : 
        undefined;
        name = chatUsers[0].user.name
    }

    const chatUrl = `/chat/${id}`;
    
    return (
        <Link 
            className='m-1 p-1 flex bg-white _bg-gray-50 hover:bg-blue-100 transition-all _hover:bg-gray-100 rounded-lg'
            href={chatUrl}
        >
            <img
                className="w-12 h-12 object-cover rounded-lg"
                src={userAvatarUrl}
                alt="item"
            />
            <div className='ml-2'>
                <div>
                    <span className='text-lg'>{name}</span>
                </div>
                {
                    !!item &&
                    <div className='flex w-fit text-xs bg-purple-300 rounded overflow-hidden'>
                        <div className='px-2 py-[2px] text-white'>{item.lable}</div>
                        <div className='px-1 py-[2px] text-white bg-blue-500'>${item.price}</div>
                    </div>
                }
            </div>
        </Link>
    )
}

export default ChatView;
