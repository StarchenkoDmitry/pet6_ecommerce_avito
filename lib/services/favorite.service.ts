import { MyFavorite, MyFavoriteList } from "@prisma/client";
import db from "../db";


export async function createMyFavoriteList(
):Promise<MyFavoriteList | undefined>{
    try {
        const res = await db.myFavoriteList.create({
            data:{}
        });
        return res;
    } catch (error) {
        return;
    }
}

export async function addFavoriteToMyFavoriteList(
    itemId:string,
    myFavoriteListId:string
):Promise<MyFavorite | undefined>{
    try {
        const res = await db.myFavorite.create({
            data:{
                itemId:itemId,
                myFavoriteListId:myFavoriteListId,
            }
        });
        return res;
    } catch (error) {
        console.log("SSSSSSSSSSSSS:",error);
        return;
    }
}

