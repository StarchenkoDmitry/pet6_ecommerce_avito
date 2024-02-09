'use client'
import { useState } from 'react';

import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutLine } from '@heroicons/react/24/outline';

import { changeFavorite } from '@/actions/favorite';

import ItemImage from '../ui/ItemImage';
import { ItemAndFavorite } from '@/types/item';
import clsx from 'clsx';


export interface Props {
    item: ItemAndFavorite;
    className?:string;
    imageSizes?:string;
}

function ItemView({item,className,imageSizes}: Props) {
    const {id,mainImageId,lable,price,isFavorite:isFavoriteProp} = item;
    
    const itemUrl = `/item/${id}`;

    const [isFavorite,setIsFavorite] = useState(isFavoriteProp);
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
        <div className={clsx("p-2 bg-white rounded-lg",
            className
        )}>
            <a href={itemUrl}>
                <ItemImage
                    className="w-full aspect-square object-cover rounded"
                    id={mainImageId}
                    sizes={imageSizes ?? "250px"}
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
            <span className='px-1 block text-sm font-medium'>$ {price}</span>
        </div>
    )
}

export default ItemView;
