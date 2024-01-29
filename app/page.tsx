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
        },
        images:{
          select:{
            id:true
          }
        },
      },
      orderBy:{
        ceatedAt:"desc"
      }
    });
    return items.map(({favorites,...itemRest})=>({
      ...itemRest,
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

          lable:true,
          price:true,
          description:true,
          mainImageId:true,
          images:{
            select:{
              id:true
            }
          },
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

      return items.map(({tempFavorites,...itemRest})=>({
        ...itemRest,
        favorite: tempFavorites.length >= 1
      }));
    }else{
      const items = await db.item.findMany({
        select:{
          id:true,
          ceatedAt:true,
          updatedAt:true,
          lable:true,
          price:true,
          description:true,
          mainImageId:true,
          images:{
            select:{
              id:true
            }
          },
          userId:true,
        },
        take:MAX_TAKE_ITEM,
      });
      return items.map(i=>({...i,favorite:false}));
    }
  }
}
