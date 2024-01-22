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
          item={i}
        />))
      }
      </div>
    </div>
  )
}





const MAX_TAKE_ITEM = 16;

async function getItemWithFavorite() {
  const session = await auth();

  if(session){
    const items = await db.item.findMany({
      take:MAX_TAKE_ITEM,
      include:{
        favorites:{
          where:{
            userId:session.user.userId
          }
        }
      }
    });
    return items.map(({id,ceatedAt,updatedAt,description,price,imageId,lable,userId,favorites})=>({
      id,
      ceatedAt,
      updatedAt,
      description,
      price,
      imageId,
      userId,
      lable,
      favorite: favorites.length >= 1
    }));
  }else{
    const tempFLId = cookies().get(COOKIE_FAVORITE_KEY)?.value;

    if(tempFLId){
      const items = await db.item.findMany({
        select:{
          id:true,
          ceatedAt:true,
          updatedAt:true,
          description:true,
          price:true,
          lable:true,
          imageId:true,
          userId:true,

          tempFavorites:{
            where:{
              tempFavoriteListId:tempFLId
            },
            take:1
          }
        },
        take:MAX_TAKE_ITEM,
      });

      return items.map(({id,ceatedAt,updatedAt,description,price,imageId,lable,userId,tempFavorites})=>({
        id,
        ceatedAt,
        updatedAt,
        description,
        price,
        imageId,
        userId,
        lable,
        favorite: tempFavorites.length >= 1
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
