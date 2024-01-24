"use client";
/* eslint-disable @next/next/no-img-element */

import { Item } from "@prisma/client";
import { UserOwner } from "./Item";

export interface Props {
    item: Item;
    isOwner: boolean;
    userOwner?: UserOwner;
}

function ItemSidePanel({ isOwner, item, userOwner }: Props) {
    const { price } = item;

    const userAvatarUrl = userOwner
        ? userOwner.imageId
            ? `/api/avatar/${userOwner.imageId}`
            : "/img/1.jpg"
        : "/img/1.jpg";

    const handleWriteMessage = () => {

    };

    return (
        <div className="w-80 flex flex-col">
            <span className="px-1 block text-2xl font-medium_">{price} ₽</span>
            {isOwner ? 
                <div>
                    <span>Это ваше объявление</span>
                </div> : 
                <>
                    <span>Купить</span>
                    <button
                        className="my-2 p-2 text-white bg-sky-400 rounded-lg"
                        onClick={handleWriteMessage}
                    >
                        Написать сообщение
                    </button>
                </>
            }            
            {userOwner ? (
                <div className="p-1 bg-blue-100 rounded-lg">
                    <a href="/profile" className="">
                        <img
                            className="w-11 h-11 object-cover rounded-full"
                            src={userAvatarUrl}
                            alt="avatar"
                        />
                    </a>
                    <h3>Продавец</h3>
                    {!!userOwner.name ? (
                        <span>Name: {userOwner.name}</span>
                    ) : (
                        <span>Без имени</span>
                    )}
                    {!!userOwner.surname && <span>Surname: {userOwner.surname}</span>}
                </div>
            ) : (
                <div>
                    
                </div>
            )}
        </div>
    );
}

export default ItemSidePanel;
