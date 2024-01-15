'use client'

import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { addFavorite } from '../lib/actions/favorite';
import { HeartIcon as HeartIconOutLine } from '@heroicons/react/24/outline';


export interface Props {
    id:string;
    imageId?:string | null;
    title?:string;
    favorite?:boolean;
}

function ItemView({id,imageId,title,favorite}: Props) {

    const imageUrl = imageId ? `/api/image/${imageId}` : "/img/1.jpg";

    const itemUrl = `/item/${id}`;

    const handleAdd = async ()=>{
        const res = await addFavorite(id);
        console.log("handleAdd",res);
    }

    return (
        <div className="m-2 p-2 w-64 bg-white rounded-lg">
            <a href={itemUrl}>
                {/* <Image
                    className="w-[250px] h-[200px] object-cover"
                    src={imageUrl}
                    alt="item"
                    width={50}
                    height={250}
                /> */}
                <img
                    className="w-[250px] h-[200px] object-cover"
                    src={imageUrl}
                    alt="item"
                    width={50}
                    height={250}
                />
            </a>
            <div className='flex _flex-wrap _flex-none justify-between'>
                <a href={"/"} className='p-1 line-clamp-2 break-words text-sm text-blue-500'>
                    {title}
                </a>
                <button className='flex-none flex justify-center items-center m-1 w-6 h-6' onClick={handleAdd}>
                {
                    favorite ?
                    <HeartIconSolid className='flex-none m-1 w-6 h-6 text-rose-500'/> :
                    <HeartIconOutLine className='flex-none m-1 w-6 h-6 text-sky-300'/>   
                }
                </button>
            </div>
            <span className='px-1 block text-sm font-medium'>2 800 ₽</span>
        </div>
    )
}

export default ItemView;
