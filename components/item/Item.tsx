"use client";
import { useState } from "react";

import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutLine } from "@heroicons/react/24/outline";

import ItemSidePanel from "./ItemSidePanel";
import ItemImage from "../ui/ItemImage";

import { Item } from "@prisma/client";
import { UserOwner } from "@/types/user";
import { changeFavorite } from "@/actions/favorite";


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
        <div className="mx-2 px-2">
            <div className="md:flex">
                <div className="flex-1">
                    <h2 className="mx-2 text-2xl">{lable}</h2>
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
        </div>
    );
}

export default Item;
