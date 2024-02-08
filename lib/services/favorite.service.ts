import db from "@/db";
import { 
    Favorite, 
    TempFavorite, 
    TempFavoriteList 
} from "@prisma/client";
import { TRANSFER_MAX_FAVORITE } from "@/constants";


export async function createMyTempFavoriteList(
):Promise<TempFavoriteList | undefined>{
    try {
        const res = await db.tempFavoriteList.create({
            data:{}
        });
        return res;
    } catch (error) {
        console.log("createMyTempFavoriteList error:",error);
        return;
    }
}

export async function addTempFavorite(
    itemId:string,
    tempFavoriteListId:string
):Promise<TempFavorite | undefined>{
    try {
        const res = await db.tempFavorite.create({
            data:{
                itemId:itemId,
                tempFavoriteListId:tempFavoriteListId,
            }
        });
        return res;
    } catch (error) {
        console.log("addTempFavorite error:",error);
        return;
    }
}

export async function addMyFavorite(
    itemId:string,
    userId:string
):Promise<Favorite | undefined>{
    try {
        const res = await db.favorite.create({
            data:{
                itemId:itemId,
                userId:userId,
            }
        });
        return res;
    } catch (error) {
        console.log("addFavorite error:",error);
        return;
    }
}

export async function transferFavorite(
    tempFavoriteListId:string,
    userId:string
):Promise<boolean>{
    console.log("transferFavorite:",tempFavoriteListId,userId);
    try {
        await db.$transaction(async(ts)=>{
            const myTFIds = await ts.tempFavorite.findMany({
                where:{
                    tempFavoriteListId:tempFavoriteListId
                },
                take:TRANSFER_MAX_FAVORITE
            });
            await ts.favorite.createMany({
                data:myTFIds.map(i=>({
                    userId:userId,
                    itemId:i.itemId
                }))
            });
            await ts.tempFavoriteList.delete({
                where:{
                    id:tempFavoriteListId,
                }
            });
        });
        return true;
    } catch (error) {
        console.log("transferFavorite error:",error);
        return false;
    }
}
