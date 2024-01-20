'use client'

import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutLine } from '@heroicons/react/24/outline';
import { Item } from '@prisma/client';
import { useState } from 'react';
import { changeFavorite } from '@/lib/actions/favorite';

export interface Props {
    item: Item;
}

function MyItem({item}: Props) {
    const { id, imageId, lable, price } = item;

    const imageUrl = imageId ? `/api/image/${imageId}` : "/img/1.jpg";
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
                    {lable}
                </a>
            </div>
            <span className='px-1 block text-sm font-medium'>{price} ₽</span>
        </div>
    )
}

export default MyItem;
