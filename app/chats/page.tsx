import ChatView from "@/components/chat/ChatView";
import ChatsSideBar from "@/components/chats/ChatsSideBar";
import db from "@/lib/db";


export default async function Home() {    
    const user = await db.user.currentUser();

    if (!user) {
        return (
            <div className="p-2 bg-gray-50 rounded-lg">
                <span className="mx-1 text-xl">Зарегистрируйтесь</span>
            </div>
        );
    }

    let chatsRaw = await db.chat.findMany({
        where: {
            chatUsers: {
                some: {
                    userId: user.id,
                },
            },
        },
        include: {
            chatUsers: {
                where: {
                    userId: {
                        not: user.id,
                    },
                },
                select: {
                    user: {
                        select: {
                            id: true,
                            imageId: true,
                            name: true,
                            surname: true,
                        },
                    },
                },
            },
            item: true,
        },
    });

    const chats = chatsRaw.map(({chatUsers,...chat})=>({
      ...chat,
      user:chatUsers.length >=1 ? chatUsers[0].user : undefined,
    }))

    return (
        <div className="p-2 rounded-lg">
            <h2 className="mx-4 text-xl">Chats</h2>
            <div className="flex max-md:flex-col">
                <div className="m-1 w-48">
                    <ChatsSideBar />
                </div>
                <div className="m-1 flex-1 flex flex-col _flex-wrap justify-between bg-gray-100 _bg-blue-100  rounded-lg">
                    {chats.map((c) => (
                        <ChatView key={c.id} chat={c} />
                    ))}
                </div>
            </div>
        </div>
    );
}
