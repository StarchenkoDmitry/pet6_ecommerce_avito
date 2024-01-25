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
        userId: string;
        updatedAt: Date;
        imageId: string | null;
        lable: string;
        price: number;
        description: string | null;
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
        <div className='m-1 p-1 flex bg-gray-50 rounded-lg'>
            <img
                className="w-12 h-12 object-cover rounded-lg"
                src={userAvatarUrl}
                alt="item"
            />
            <div className='p-1 '>
                <div>name:{name}</div>
            </div>
            {
                item?
                <div>
                    <div>Тавар:{item.lable}</div>
                    <div>Price:{item.price}</div>
                </div> :
                <div>
                    <span>Без товара</span>
                </div>
            }
            <Link 
                className='ml-auto p-2 text-white bg-green-400 rounded-lg hover:bg-green-500'
                href={chatUrl}
            >
                Open
            </Link>
        </div>
    )
}

export default ChatView;
