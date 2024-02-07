import { auth } from "@/config/authConfig";
import db from "@/lib/db";
import { findChatByIdAndUserIdWithItem } from "@/lib/db/chat";
import ChatSocket from "@/components/chat/ChatSocket";


export default async function Home({ params }: { params: { id: string } }) {
    const { id: chatId } = params;

    const session = await auth();
    const user = await db.user.currentUser();

    const accessToken = session?.user.accessToken;

    if (!user || !session || !accessToken) {
        return <div>Зарегистрируйтесь</div>;
    }    

    const chat = await findChatByIdAndUserIdWithItem(chatId, user.id);

    if (!chat) {
        return <div>Chat with id {chatId} is not exist.</div>;
    }


    const userCom = chat.chatUsers.length > 0 ? chat.chatUsers[0].user : undefined;

    return (
        <div className="flex flex-col flex-1">
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
