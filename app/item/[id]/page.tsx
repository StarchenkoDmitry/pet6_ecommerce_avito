/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

import db from '@/lib/db';

import { HeartIcon as HeartIconOutLine } from '@heroicons/react/24/outline';
import Item, { ItemOwner } from '@/components/item/Item';



export default async function Home({ params }: { params: { id: string } }) {
  const { id } = params;
  console.log("Render Item page");

  const user = await db.user.currentUser();

  if(user){
    const item = await db.item.findFirst({
      where:{ id:id },
      include:{
        user:{
          select:{
            id:true,
            imageId:true,
            name:true,
            surname:true,
          }
        },
        favorites:{
          where:{
            userId:user.id
          }
        }
      }
    });
    console.log("ITEM: ",item);
    if(item){
      const owner = item.user ? item.user.id === user.id : false;
      const favorite = item.favorites.length >= 1;

      const itemOwner: ItemOwner | undefined = item.user ?  {
        ...item.user
      } : undefined;

      return (<Item item={item} favorite={favorite} owner={owner} itemOwner={itemOwner}/>) 
    }
  }else{
    const item = await db.item.findFirst({
      where:{ id:id },
      include:{
        user:{
          select:{
            id:true,
            imageId:true,
            name:true,
            surname:true,
          }
        }
      }
    });
    if(item){
      const itemOwner: ItemOwner | undefined = item.user ?  {
        ...item.user
      } : undefined;
      return (<Item item={item} favorite={true} owner={true} itemOwner={itemOwner}/>) 
    }
  }
  
  return(<ItemNotExist id={id}/>)

}


function ItemNotExist({id}:{id:string}){
  return (
    <div className="m-2 p-1 bg-gray-100 rounded-lg">
      <h2 className='p-1'>Item with id({id}) is not exist</h2>
    </div>
  )
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