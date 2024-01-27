import db from '@/lib/db';
import CreateMessageChat from '@/components/chat/CreateMessageChat';
import Chat from '@/components/chat/Chat';


export default async function Home({ params }: { params: { id: string } }) {
  const { id } = params;
  console.log("Render Chat page");

  const user = await db.user.currentUser();
  
  if(!user){
    return(
      <div>
        Зарегистрируйтесь
      </div>
    );
  }

  const chat = await db.chat.findFirst({
    where:{
      id:id,
      chatUsers:{
        some:{
          userId:user.id
        }
      }
    }
  });

  if(!chat){
    return(
      <div>
        Chat with id {id} is not exist.
      </div>
    );
  }

  const bTime = Date.now();

  const messages = await db.message.findMany({
    where:{
      chatId:chat.id
    },
    orderBy:{
      ceatedAt:'desc'
    },
    take:10000,
  });

  const aTime = Date.now();
  console.log("Time loading messages: ",aTime - bTime,` count:${messages.length}`);

  return(
    <div className='flex flex-col flex-1    _h-full _max-h-full'>
      <h3>CHATIK</h3>
      <CreateMessageChat chatId={chat.id}/>
      <Chat chat={chat} messages={messages}/>
    </div>
  );
}





// else{
//   const { lable, imageId, price } = item;
//   const imageUrl = imageId ? `/api/image/${imageId}` : "/img/1.jpg";

//   return (
//     <div className="m-2 p-1 flex bg-gray-50 rounded-lg">
//       <div className='flex-1'>
//         <h2 className='m-2 text-2xl'>{lable}</h2>
//         <img
//             className="w-[250px] h-[200px] object-cover rounded"
//             src={imageUrl}
//             alt="item"
//             width={50}
//             height={250}
//         />
//       </div>
//       <div className='w-80'>
//         <span className='px-1 block text-2xl font-medium_'>{price} ₽</span>
//         <button className='px-2 p-1 flex items-center bg-gray-200 rounded-lg'>
//           <HeartIconOutLine className='flex-none m-1 w-5 h-5'/>
//           <span>Add to favorite</span>
//         </button>
//       </div>
//     </div>
//   )
// }
