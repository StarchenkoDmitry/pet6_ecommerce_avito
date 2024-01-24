/* eslint-disable @next/next/no-img-element */
"use client"

import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid"
import Image from "next/image"
import { addFavorite, changeFavorite } from "../../lib/actions/favorite"
import { HeartIcon as HeartIconOutLine } from "@heroicons/react/24/outline"
import { Item } from "@prisma/client"
import { useState } from "react"
import ItemSidePanel from "./ItemSidePanel"


export interface UserOwner{
  id:string;
  imageId:string | null;
  name:string;
  surname:string | null;
}

export interface Props {
  item: Item;
  favorite: boolean;
  isOwner: boolean;
  userOwner?: UserOwner;
}
//itemOwner
function Item({ item, favorite, isOwner,userOwner }: Props) {
  const { id, imageId, lable, price } = item;
  const imageUrl = imageId ? `/api/image/${imageId}` : "/img/1.jpg";
  const userAvatarUrl = userOwner ? 
    userOwner.imageId ? `/api/avatar/${userOwner.imageId}` : "/img/1.jpg" : 
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

  const handleCreateChat = ()=>{
    
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
              <HeartIconSolid className="flex-none m-1 w-5 h-5 text-rose-500" /> : 
              <HeartIconOutLine className="flex-none m-1 w-5 h-5  _text-sky-300" />
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
        <ItemSidePanel isOwner={isOwner} item={item} userOwner={userOwner}/>

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




        {/* <div className="w-80 flex flex-col">
          <span className="px-1 block text-2xl font-medium_">{price} ₽</span>
          <div>{isOwner ? <span>owner</span> : <span>Купить</span>}</div>
          <button className="my-2 p-2 text-white bg-sky-400 rounded-lg" onClick={handleWriteMessage}>
            Написать сообщение
          </button>
          {
            userOwner ? 
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
                !!userOwner.name ? <span>Name: {userOwner.name}</span> :
                <span>Без имени</span>
              }
              {
                !!userOwner.surname && <span>Surname: {userOwner.surname}</span>
              }
            </div> :
            <div>
              <span>Это ваше объявление</span>
            </div>
          }
        </div> */}