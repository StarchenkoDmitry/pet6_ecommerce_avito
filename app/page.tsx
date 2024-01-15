import Image from 'next/image';

import Navbar from '../components/ui/Navbar';
import ItemView from '@/components/ItemView';
import { auth } from '@/config/authConfig';
import db from '@/lib/db';
import { cookies } from 'next/headers';
import { COOKIE_FAVORITE_KEY } from '@/lib/constants';



export default async function Home() {
  console.log("Render Main page");

  const session = await auth();

  let items = await getItemWithFavorite();

  console.log("itemsitemsitems ",items);

  return (
    <div className="border-2 border-blue-200 bg-green-100">
      <Navbar/>

      <span>Main page</span>
      <span>User session:{ JSON.stringify(session)}</span>

      <h2>Рекомендации для вас</h2>

      <div className='flex flex-wrap justify-between _justify-around bg-lime-200'>
      {
        items.map(i=>(<ItemView 
          key={i.id}
          id={i.id}
          imageId={i.imageId}
          title={i.lable} 
          favorite={i.favorite}
        />))
      }
      </div>
    </div>
  )
}





const MAX_TAKE_ITEM = 16;

export async function getItemWithFavorite() {
  const session = await auth();

  if(session){
    //TODO: доделать код для session
    const items = await db.item.findMany({
      take:MAX_TAKE_ITEM,
    });
    return items.map(i=>({...i,favorite:false}))
  }else{
    const myFLId = cookies().get(COOKIE_FAVORITE_KEY)?.value;

    if(myFLId){
      const items = await db.item.findMany({
        select:{
          id:true,
          ceatedAt:true,
          updatedAt:true,

          lable:true,
          imageId:true,

          myFavorite:{
            where:{
              myFavoriteListId:myFLId
            },
            take:1
          }
        },
        take:MAX_TAKE_ITEM,
      });

      return items.map(({id,imageId,lable,myFavorite})=>({
        id,
        imageId,
        lable,
        favorite: myFavorite.length === 1
      }));
    }
    else
    {
      const items = await db.item.findMany({
        take:MAX_TAKE_ITEM,
      });

      return items.map(i=>({...i,favorite:false}));
    }
  }
}





// console.log("Render Main page");

// const session = await auth();

// let items;
// if(session){
//   items = await db.item.findMany({
//     take:16,
//   });
// }else{
//   const myFLId = cookies().get(COOKIE_FAVORITE_KEY)?.value;

//   if(myFLId){

//     items = await db.item.findMany({
//       select:{
//         id:true,
//         lable:true,
//         imageId:true,
//         myFavorite:{
//           where:{
//             myFavoriteListId:myFLId
//           },
//           take:1
//         }
//       },
//       take:16,
//     })

//     const fov = await db.myFavorite.findMany({
//       where:{
//         itemId:{
//           in:items.map(i=>i.id)
//         },
//         myFavoriteListId:myFLId
//       }
//     })

//     console.log("myFLId ",myFLId);
//     console.log("fov ",fov);

//   }else{
//     items = await db.item.findMany({
//       take:16,
//     })
//   }
// }


// console.log("itemsitemsitems ",items);
// // console.log("itemsitemsitems ",JSON.stringify(items));










        // list.map(i=>(<ItemView key={i.url} title={i.title} url={i.url}/>))


// <br/>
// <div className='flex flex-wrap justify-between  _justify-around bg-lime-200'>
// {
//   // list.map(i=>(<ItemView key={i.url} title={i.title} url={i.url}/>))
//   [...items,...items,...items,...items].map(i=>(<ItemView 
//     key={i.id}
//     url={"/api/image/"+i.imageId}
//     title={i.lable} 
//   />))
// }
// </div>





{/* <div className='p-2 flex'>
<input 
  className='bg-slate-300'
  type="text" 
  name="" 
  id=""
/>
</div> */}

{/* <Image
className=""
src="/next.svg"
alt="Next.js Logo"
width={180}
height={37}
priority
/> */}



// const list = [
//   {
//     title:"67867867967956789567956795679567969",
//     url:"/img/1.jpg",
//   },
//   {
//     title:"67867867967956789567956795679567969 67867867967956789567956795679567969 6786786796795678956795679567956796967867867967956789567956795679567969",
//     url:"/img/1.jpg",
//   },
//   {
//     title:"Новый клетчатый пиджак Club of Gents",
//     url:"/img/2.jpg",
//   },
//   {
//     title:"Новый клетчатый пиджак Club of Gents Новый клетчатый пиджак Club of Gents Новый клетчатый пиджак Club of Gents",
//     url:"/img/3.jpg",
//   },
//   {
//     title:"rand text text text text text text text text text text text text text",
//     url:"/img/4.jpg",
//   },
//   {
//     title:"randtextghfgh randtextghfghrandtextghfghrandtextghfgh   randtextghfgh randtextghfgh randtextghfgh randtextghfgh ",
//     url:"/img/5.jpg",
//   },
//   // {
//   //   title:"rand text",
//   //   url:"/img/6.jpg",
//   // },
// ];