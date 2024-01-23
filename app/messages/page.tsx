import db from '@/lib/db'

export default async function Home() {
  console.log("Render Messages page");
  
  const user = await db.user.currentUser();

  if(user){
    console.log("Messages page user:",user.id);
    const chats = await db.chat.findMany({
      where:{
        chatUsers:{
          some:{
            userId:user.id
          }
        }
      }
    });
    console.log("Messages page chats:",chats);

    return (
      <div className="p-2 bg-gray-50 rounded-lg">
        <span className='mx-1 text-xl'>Messages</span>
        <div className='flex flex-wrap justify-between bg-gray-100  rounded-lg'>
        {
          chats.map(e=>(<div key={e.id}>
            {JSON.stringify(e)}
          </div>))
        }
        </div>
      </div>
    )
  }else{
    return (
      <div className="p-2 bg-gray-50 rounded-lg">
        <span className='mx-1 text-xl'>Зарегистрируйтесь</span>
      </div>
    )
  } 
}
