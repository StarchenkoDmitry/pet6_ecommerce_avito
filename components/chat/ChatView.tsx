
import { Chat, Item } from '@prisma/client';
import React from 'react'

export type ItemWithChatUser = Chat & {
    chatUsers: {
        id: string;
        userId: string;
        chatId: string;
    }[];
}

export interface ChatViewProps {
    chat:ItemWithChatUser;
}

function ChatView({chat}: ChatViewProps) {
    const { id,itemId, chatUsers  } = chat;

    return (
        <div key={id} className='m-2 p-1 bg-gray-100 rounded-lg'>
          <div>chatId:{id}</div>
          <div>itemId:{itemId}</div>
          {
            chatUsers.map(u=>(<div key={u.id}>
              userId:{u.userId}
            </div>))
          }
        </div>
    )
}

export default ChatView;
