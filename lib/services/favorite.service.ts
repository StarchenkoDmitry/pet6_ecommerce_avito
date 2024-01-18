import { MyFavorite, MyTempFavorite, MyTempFavoriteList } from "@prisma/client";
import db from "../db";


export async function createMyTempFavoriteList(
):Promise<MyTempFavoriteList | undefined>{
    try {
        const res = await db.myTempFavoriteList.create({
            data:{}
        });
        return res;
    } catch (error) {
        console.log("createMyTempFavoriteList error:",error);
        return;
    }
}

//ToMyTempFavoriteList
export async function addTempFavorite(
    itemId:string,
    myFavoriteListId:string
):Promise<MyTempFavorite | undefined>{
    try {
        const res = await db.myTempFavorite.create({
            data:{
                itemId:itemId,
                myFavoriteListId:myFavoriteListId,
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
):Promise<MyFavorite | undefined>{
    try {
        const res = await db.myFavorite.create({
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


const TRANSFER_MAX_FAVORITE = 1024;

export async function transferFavorite(
    myTempFavoriteListId:string,
    userId:string
):Promise<boolean>{
    console.log("service transferFavorite:",myTempFavoriteListId,userId);
    try {
        const resTrans = await db.$transaction(async(ts)=>{
            const myTFIds = await ts.myTempFavorite.findMany({
                where:{
                    myFavoriteListId:myTempFavoriteListId
                },
                take:TRANSFER_MAX_FAVORITE
            });
            await ts.myFavorite.createMany({
                data:myTFIds.map(i=>({
                    userId:userId,
                    itemId:i.itemId
                }))
            });
            await ts.myTempFavorite.deleteMany({
                where:{
                    myFavoriteListId:myTempFavoriteListId
                }
            });
            await ts.myTempFavoriteList.delete({
                where:{
                    id:myTempFavoriteListId
                }
            });
            return "NICE";
        });
        console.log("transferFavorite resTrans:",resTrans);
        return true;
    } catch (error) {
        console.log("transferFavorite error:",error);
        return false;
    }
}
