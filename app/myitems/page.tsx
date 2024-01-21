import Image from 'next/image';

import { auth } from '@/config/authConfig';
import db from '@/lib/db';
import MyItem from './MyItem';


export default async function Home() {
  console.log("Render MyItems page");
  
  const session = await auth();

  if(session){
    const items = await db.item.findMany({
      where:{
        userId:session.user.userId
      }
    });

    return (
      <div className="p-2 bg-gray-50 rounded-lg">
        <span className='mx-1 text-xl'>My items</span>
        <div className='flex flex-wrap justify-between bg-gray-100  rounded-lg'>
        {
          items.map(i=>(<MyItem key={i.id} item={i} />))
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


// const MAX_TAKE_ITEM = 16;

// async function getMyItems() {
//   const session = await auth();

//   if(session){
//     const items = await db.item.findMany({
//       take:MAX_TAKE_ITEM,
//       include:{
//         favorites:{
//           where:{
//             userId:session.user.userId
//           }
//         }
//       }
//     });
//   }else{
//     const myFLId = cookies().get(COOKIE_FAVORITE_KEY)?.value;

//     if(myFLId){
//       const items = await db.item.findMany({
//         select:{
//           id:true,
//           ceatedAt:true,
//           updatedAt:true,

//           price:true,
//           lable:true,
//           imageId:true,

//           myTempFavorites:{
//             where:{
//               myFavoriteListId:myFLId
//             },
//             take:1
//           }
//         },
//         take:MAX_TAKE_ITEM,
//       });

//       return items.map(({id,ceatedAt,updatedAt,price,imageId,lable,myTempFavorites})=>({
//         id,
//         ceatedAt,
//         updatedAt,
//         price,
//         imageId,
//         lable,
//         favorite: myTempFavorites.length >= 1
//       }));
//     }
//     else
//     {
//       const items = await db.item.findMany({
//         take:MAX_TAKE_ITEM,
//       });

//       return items.map(i=>({...i,favorite:false}));
//     }
//   }
// }

