import Image from 'next/image';

import Navbar from '../components/ui/Navbar';
import ItemView from '@/components/item/ItemView';
import { auth } from '@/config/authConfig';
import db from '@/lib/db';
import { cookies } from 'next/headers';
import { COOKIE_FAVORITE_KEY } from '@/lib/constants';



export default async function Home() {
  console.log("Render Main page");

  let items = await getItemWithFavorite();

  return (
    <div className="">
      <Navbar/>
      <h2 className='m-2 my-1 text-xl font-bold'>Рекомендации для вас</h2>

      <div className='bg-gray-100 rounded-lg flex flex-wrap justify-between _justify-around'>
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
      },
      orderBy:{
        ceatedAt:"desc"
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
