import React from 'react';
import Link from 'next/link';

import { ChatWithChatUserAndItem } from '@/types/chat';

import Avatar from '../ui/Avatar';


export interface ChatViewProps {
    chat:ChatWithChatUserAndItem;
}

function ChatView({chat}: ChatViewProps) {
    const { id, item, user } = chat;

    const chatUrl = `/chat/${id}`;
    const userImageID = user ? user.imageId : null;
    const userName = user? user.name : "без имени";

    return (
        <Link 
            className='m-1 p-1 flex bg-white _bg-gray-50 hover:bg-blue-100 transition-all _hover:bg-gray-100 rounded-lg'
            href={chatUrl}
        >
            <Avatar
                className='w-[48px] h-[48px] object-cover rounded-lg'
                id={userImageID}
            />
            <div className='ml-2'>
                <div>
                    <span className='text-lg'>{userName}</span>
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
