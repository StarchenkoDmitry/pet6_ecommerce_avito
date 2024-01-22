/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

import db from '@/lib/db';

import { HeartIcon as HeartIconOutLine } from '@heroicons/react/24/outline';


export default async function Home({ params }: { params: { id: string } }) {
  const { id } = params;
  console.log("Render Item page");

  const item = await db.item.findFirst({
    where:{ id:id }
  });

  if(!item){
    return (
      <div className="m-2 p-1 bg-gray-100 rounded-lg">
        <h2 className='p-1'>Item with id({id}) is not exist</h2>
      </div>
    )
  }else{
    const { lable, imageId, price } = item;
    const imageUrl = imageId ? `/api/image/${imageId}` : "/img/1.jpg";

    return (
      <div className="m-2 p-1 flex bg-gray-50 rounded-lg">
        <div className='flex-1'>
          <h2 className='m-2 text-2xl'>{lable}</h2>
          <img
              className="w-[250px] h-[200px] object-cover rounded"
              src={imageUrl}
              alt="item"
              width={50}
              height={250}
          />
        </div>
        <div className='w-80'>
          <span className='px-1 block text-2xl font-medium_'>{price} ₽</span>
          <button className='px-2 p-1 flex items-center bg-gray-200 rounded-lg'>
            <HeartIconOutLine className='flex-none m-1 w-5 h-5'/>
            <span>Add to favorite</span>
          </button>
        </div>
      </div>
    )
  }
}



{/* 
<div className='flex _flex-wrap _flex-none justify-between'>
  <a href={"/"} className='p-1 line-clamp-2 break-words text-sm text-blue-500'>
      
  </a>
  <button 
    className='flex-none flex justify-center items-center m-1 w-6 h-6' 
    // onClick={handleAdd}
  >
  {
      // favorite ?
      // <HeartIconSolid className='flex-none m-1 w-6 h-6 text-rose-500'/> :
      // <HeartIconOutLine className='flex-none m-1 w-6 h-6 text-sky-300'/>   
  }
  </button>
</div>
<span className='px-1 block text-sm font-medium'>2 800 ₽</span> 
*/}
