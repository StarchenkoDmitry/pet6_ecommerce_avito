/* eslint-disable @next/next/no-img-element */
"use client"

import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid"
import Image from "next/image"
import { addFavorite, changeFavorite } from "../../lib/actions/favorite"
import { HeartIcon as HeartIconOutLine } from "@heroicons/react/24/outline"
import { Item } from "@prisma/client"
import { useState } from "react"


export interface ItemOwner{
  id:string;
  imageId:string | null;
  name:string;
  surname:string | null;
}

export interface Props {
  item: Item;
  itemOwner?: ItemOwner;
  favorite: boolean;
  owner: boolean;
}

function Item({ item, favorite, owner,itemOwner }: Props) {
  const { id, imageId, lable, price } = item;
  const imageUrl = imageId ? `/api/image/${imageId}` : "/img/1.jpg";
  const userAvatarUrl = itemOwner ? 
    itemOwner.imageId ? `/api/avatar/${itemOwner.imageId}` : "/img/1.jpg" : 
    undefined;

  const itemUrl = `/item/${id}`;

  const [isFavorite, setIsFavorite] = useState(favorite);
  const [changing, setChanging] = useState(false);

  const handelChange = async () => {
    if (changing) return;
    setChanging(true);
    changeFavorite(id).then((changed) => {
      setChanging(false);
      if (changed) setIsFavorite((prev) => !prev);
    });
  }

  return (
    <div className="m-2 p-2 _flex _bg-gray-100 _rounded-lg">
      <div className="md:flex">
        <div className="flex-1">
          <h2 className="m-2 text-2xl">{lable}</h2>
          <button
            className="mb-2 px-1 flex items-center bg-gray-200 rounded-lg"
            onClick={handelChange}
          >
            {
              isFavorite ? 
              <HeartIconSolid className="flex-none m-1 w-6 h-6 text-rose-500" /> : 
              <HeartIconOutLine className="flex-none m-1 w-6 h-6 text-sky-300" />
            }
            <span className="px-1">Add to favorite</span>
          </button>
          <img
            className="w-[250px] h-[200px] object-cover rounded"
            src={imageUrl}
            alt="item"
            width={50}
            height={250}
          />
        </div>
        <div className="w-80">
          <span className="px-1 block text-2xl font-medium_">{price} ₽</span>
          <div>{owner ? <span>owner</span> : <span>Купить</span>}</div>
          {
            itemOwner ? 
            <div className="p-1 bg-blue-100 rounded-lg">
              <a href="/profile" className="">
                <img
                  className="w-11 h-11 object-cover rounded-full"
                  src={userAvatarUrl}
                  alt="avatar"
                />
              </a>
              <h3>Продавец</h3>
              { 
                !!itemOwner.name ? <span>Name: {itemOwner.name}</span> :
                <span>Без имени</span>
              }
              {
                !!itemOwner.surname && <span>Surname: {itemOwner.surname}</span>
              }
            </div> :
            <div></div>
          }
          
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-medium">Адрес</h3>
        <span>Республика Бурятия, Улан-Удэ р-н Советский</span>

        <h3 className="text-2xl font-medium">Характеристики</h3>
        
      </div>
    </div>
  )
}

export default Item;
