import { auth } from '@/config/authConfig';
import db from '@/lib/db';
import ChatSocket from '@/components/chat/ChatSocket';
import { findChatByIdAndUserIdWithItem } from '@/lib/db/chat';


export default async function Home({ params }: { params: { id: string } }) {
  const { id:chatId } = params;
  console.log("Render Chat page");
  
  const session = await auth();
  const user = await db.user.currentUser();
  
  if(!user || !session){
    return(
      <div>
        Зарегистрируйтесь
      </div>
    );
  }

  const chat = await findChatByIdAndUserIdWithItem(chatId,user.id);

  if(!chat){
    return(
      <div>
        Chat with id {chatId} is not exist.
      </div>
    );
  }

  const accessToken = session.user.accessToken;
  // console.log("ITME:",chat.chatUsers);

  const userCom = chat.chatUsers.length > 0 ? chat.chatUsers[0].user : undefined;

  return(
    <div className='flex flex-col flex-1'>
      <ChatSocket
        token={accessToken}
        chatId={chatId}
        me={user}
        user={userCom}
        item={chat.item}
      />      
    </div>
  );
}
