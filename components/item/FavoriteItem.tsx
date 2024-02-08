'use client'
import { useState } from 'react';

import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutLine } from '@heroicons/react/24/outline';

import { Item } from '@prisma/client';
import { changeFavorite } from '@/actions/favorite';
import ItemImage from '../ui/ItemImage';


export interface Props {
    item: Item;
}

function FavoriteItem({item}: Props) {
    const { id, mainImageId, lable, price } = item;

    const itemUrl = `/item/${id}`;

    const [isFavorite,setIsFavorite] = useState(true);
    const [changing,setChanging] = useState(false);

    const handelChange = async ()=>{
        if(changing)return;
        setChanging(true);
        changeFavorite(id).then((changed)=>{
            setChanging(false);
            if(changed)
            setIsFavorite((prev)=>!prev);
        })
    }

    return (
        <div className="m-2 p-2 w-64 bg-white rounded-lg">
            <a href={itemUrl}>
                <ItemImage
                    className="w-[250px] h-[200px] object-cover  rounded"
                    id={mainImageId}
                    sizes="250px"
                />
            </a>
            <div className='flex justify-between'>
                <a href={itemUrl} className='p-1 line-clamp-2 break-words text-sm text-blue-500'>
                    {lable}
                </a>
                <button className='flex-none flex justify-center items-center m-1 w-6 h-6' onClick={handelChange}>
                {
                    isFavorite ?
                    <HeartIconSolid className='flex-none m-1 w-6 h-6 text-rose-500'/> :
                    <HeartIconOutLine className='flex-none m-1 w-6 h-6 text-sky-300'/>   
                }
                </button>
            </div>
            <span className='px-1 block text-sm font-medium'>$4 {price}</span>
        </div>
    )
}

export default FavoriteItem;
