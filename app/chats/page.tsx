import ChatView from '@/components/chat/ChatView';
import db from '@/lib/db'

export default async function Home() {
  console.log("Render Messages page");
  
  const user = await db.user.currentUser();

  if(!user){
    return (
      <div className="p-2 bg-gray-50 rounded-lg">
        <span className='mx-1 text-xl'>Зарегистрируйтесь</span>
      </div>
    );
  }

  console.log("Messages page user:",user.id);

  let chats = await db.chat.findMany({
    where:{
      chatUsers:{
        some:{
          userId:user.id
        }
      }
    },
    include:{
      chatUsers:{
        where:{
          userId:{
            not:user.id
          }
        }
      }
      // chatUsers:true,
    }
  });
  
  // chats = [...chats,...chats,...chats,...chats,...chats,...chats];
  chats = [...chats,...chats,...chats];

  // console.log("Messages page chats:",chats);
  // type TypeCHATS = (typeof chats);
  // type DataType = typeof chats[keyof typeof chats];
  // console.log("Messages page DataType:",DataType);



  return (
    <div className="p-2 _bg-gray-50 rounded-lg">
      <span className='mx-1 text-xl'>Messages</span>
      <div>MyID: {user.id}</div>

      <div className='flex flex-wrap justify-between bg-blue-300  rounded-lg'>
      {/* {
        chats.map(e=>(
        <div key={e.id} className='m-2 p-1 bg-gray-100 rounded-lg'>
          <div>chatId:{e.id}</div>
          <div>itemId:{e.itemId}</div>
          {
            e.chatUsers.map(u=>(<div key={u.id}>
              userId:{u.userId}
            </div>))
          }
        </div>))
      } */}
      {
        chats.map(c=>(<ChatView key={c.id} chat={c} />))
      }
      </div>

    </div>
  );
}
