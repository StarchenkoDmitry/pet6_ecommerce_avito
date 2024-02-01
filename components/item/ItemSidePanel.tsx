"use client";

import { Item } from "@prisma/client";
import { UserOwner } from "./Item";
import { createChatAboutItem } from "@/lib/actions/chat";
import Avatar from "../ui/Avatar";


export interface Props {
    item: Item;
    isOwner: boolean;
    userOwner?: UserOwner;
}

function ItemSidePanel({ isOwner, item, userOwner }: Props) {
    const { price } = item;

    const handleWriteMessage = () => {
        createChatAboutItem(item.id)
        .then((res)=>{
            console.log("createChatAboutItem RESULT",res);
        });
    };

    const handleShowPhone = ()=>{
        //todo:ShowPhone
    }

    return (
        <div className="md:w-80 flex flex-col">
            <span className="px-1 block text-2xl font-medium_">$ {price}</span>
            {isOwner ? 
                <div className="my-2 p-1 bg-sky-100 rounded-lg">
                    <span>Это ваше объявление</span>
                </div> : 
                <>
                    <button
                        className="p-2 bg-green-300 hover:bg-green-400 rounded-lg"
                        onClick={handleShowPhone}>
                        Показать номер телефона
                    </button>
                    <button
                        className="my-2 p-2 text-white bg-sky-400 hover:bg-sky-500 rounded-lg"
                        onClick={handleWriteMessage}
                    >
                        Написать сообщение
                    </button>
                </>
            }
            {userOwner ? (
                <div className="p-1 bg-sky-100 rounded-lg">
                    <h3>Продавец</h3>
                    <div className="flex">
                        <a
                            className="mr-2"
                            href={`/user/${userOwner.id}`}>
                            <Avatar
                                className="w-[64px] h-[64px] object-cover rounded-full"
                                id={userOwner.imageId}
                                sizes="64px"
                            />
                        </a>
                        <div className="flex flex-col">
                            <div>
                                <span className="mr-2">name</span>
                                <a
                                    className="text-blue-400"
                                    href={`/user/${userOwner.id}`}
                                >
                                    {userOwner.name}
                                </a>
                            </div>
                            {!!userOwner.surname && 
                                <div>
                                    <span className="mr-2">surname</span>
                                    <a
                                        className="text-blue-400"
                                        href={`/user/${userOwner.id}`}
                                    >
                                        {userOwner.surname}
                                    </a>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            ) : (
                <div className="p-1 bg-sky-100 rounded-lg">
                    <h3>У данного товара отсутствует продавец</h3>
                </div>
            )}
        </div>
    );
}

export default ItemSidePanel;
