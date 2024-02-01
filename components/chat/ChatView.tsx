import Link from 'next/link';
import React from 'react'

import { Chat } from '@prisma/client';

import Avatar from '../ui/Avatar';


export type ChatWithChatUserAndItem = Chat & {
    user?:{
        id: string;
        imageId: string | null;
        name: string;
        surname: string | null;
    },
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
    const { id, item, user } = chat;

    return (
        <Link 
            className='m-1 p-1 flex bg-white _bg-gray-50 hover:bg-blue-100 transition-all _hover:bg-gray-100 rounded-lg'
            href={`/chat/${id}`}
        >
            <Avatar
                className='w-[48px] h-[48px] object-cover rounded-lg'
                id={user ? user.imageId : null}
            />
            <div className='ml-2'>
                <div>
                    <span className='text-lg'>{user? user.name : "без имени"}</span>
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
