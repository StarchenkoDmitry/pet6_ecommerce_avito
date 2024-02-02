"use client";

import { useState } from "react";

import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutLine } from "@heroicons/react/24/outline";

import ItemSidePanel from "./ItemSidePanel";
import ItemImage from "../ui/ItemImage";

import { Item, User } from "@prisma/client";
import { UserOwner } from "@/lib/types/user";
import { changeFavorite } from "../../lib/actions/favorite";


export interface Props {
    item: Item;
    favorite: boolean;
    isOwner: boolean;
    userOwner?: UserOwner;
}

function Item({ item, favorite, isOwner, userOwner }: Props) {
    const { id, mainImageId, lable } = item;

    const [isFavorite, setIsFavorite] = useState(favorite);
    const [changing, setChanging] = useState(false);

    const handelChange = async () => {
        if (changing) return;
        setChanging(true);
        changeFavorite(id).then((changed) => {
            setChanging(false);
            if (changed) setIsFavorite((prev) => !prev);
        });
    };

    return (
        <div className="m-2 p-2">
            <div className="md:flex">
                <div className="flex-1">
                    <h2 className="m-2 text-2xl">{lable}</h2>
                    <button
                        className="mb-2 px-1 flex items-center bg-gray-200 rounded-lg"
                        onClick={handelChange}
                    >
                        {isFavorite ? (
                            <HeartIconSolid className="flex-none m-1 w-5 h-5 text-rose-500" />
                        ) : (
                            <HeartIconOutLine className="flex-none m-1 w-5 h-5" />
                        )}
                        <span className="px-1">Add to favorite</span>
                    </button>
                    <ItemImage
                        id={mainImageId}
                        className="w-[250px] h-[200px] object-cover rounded"
                    />
                </div>

                <ItemSidePanel isOwner={isOwner} item={item} userOwner={userOwner} />
            </div>

            <div>
                <h3 className="text-2xl font-medium">Адрес</h3>
                <span>Республика Бурятия, Улан-Удэ р-н Советский</span>
                <h3 className="text-2xl font-medium">Характеристики</h3>
            </div>
        </div>
    );
}

export default Item;
