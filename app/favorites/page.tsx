import Image from 'next/image';

import Navbar from '@/components/ui/Navbar';
import { auth } from '@/config/authConfig';
import db from '@/lib/db';
import { COOKIE_FAVORITE_KEY } from '@/lib/constants';
import { cookies } from 'next/headers';
import ItemView from '@/components/ItemView';
import FavoriteItem from '@/components/favorite/FavoriteItem';


export default async function Home() {
  console.log("Render CreateItem page");

  const items = await getMyFavoriteItems();

  return (
    <div className="border-2 border-blue-200 bg-green-100">
      <Navbar/>
      <div className='m-1 p-1 flex flex-col'>
        <h2 className='m-1'>My favorites</h2>
        <div className='flex flex-wrap justify-between _justify-around bg-lime-200'>
        {
          items.map(i=>(<FavoriteItem 
            key={i.id}
            item={i}
          />))
        }
        </div>
      </div>
    </div>
  )
}



const MAX_TAKE_ITEM = 16;

async function getMyFavoriteItems() {
  const session = await auth();
  
  if(session){
    const items = await db.item.findMany({
      take:MAX_TAKE_ITEM,
      where:{
        favorites:{
          some:{
            userId:session.user.userId
          }
        }
      }
    });
    return items;
  }else{
    const myFLId = cookies().get(COOKIE_FAVORITE_KEY)?.value;

    if(myFLId){
      const items = await db.item.findMany({
        take:MAX_TAKE_ITEM,
        where:{
          tempFavorites:{
            some:{
              tempFavoriteListId:myFLId
            }
          }
        }
      });
      return items;
    }else{
      return [];
    }
  }
}

