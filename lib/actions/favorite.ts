'use server'

import { auth } from "@/config/authConfig";
import { cookies } from 'next/headers';
import { COOKIE_FAVORITE_KEY } from "../constants";
import { addMyFavorite, addTempFavorite, createMyTempFavoriteList } from "../services/favorite.service";
import db from "../db";


export async function addFavorite(itemId:string){
    try {
        // console.log("addFavorite itemId: ",itemId);
        
        const session = await auth();
        // console.log("addFavorite session: ",session);

        if(session){
            if(!session.user.userId){
                return { error: "failed_userId_is_not_exist" };
            }else{
                const favoriteRes = await addMyFavorite(itemId,session.user.userId);
            }
        }else{
            const myFavoriteListId = await cookies().get(COOKIE_FAVORITE_KEY)?.value;
            if(myFavoriteListId){
                const res = await addTempFavorite(itemId,myFavoriteListId);
                return { ok: !!res };
            }else{
                const newMyFavoriteList = await createMyTempFavoriteList();

                if(newMyFavoriteList){
                    //save newMyFavoriteListId in cookie
                    await cookies().set({
                        name:COOKIE_FAVORITE_KEY,
                        value:newMyFavoriteList.id,
                        httpOnly:true,
                        secure:true,
                        sameSite:"lax",
                    });
                    const res = await addTempFavorite(itemId,newMyFavoriteList.id);

                    return { ok: !!res };
                }else{
                    return { error: "failed_to_add" }
                }
            }
        }
    } catch (error) {
        return { error: "failed_request" }
    }
}

export async function changeFavorite(itemId:string){
    try {
        //TODO: заминить auth на db.user.currentUser();
        const session = await auth();

        if(session){
            const res = await db.$transaction(async(ts)=>{
                const currentFavorite = await ts.favorite.findFirst({
                    where:{
                        itemId:itemId,
                        userId:session.user.userId
                    }
                });
                if(currentFavorite){
                    await ts.favorite.delete({
                        where:{ id:currentFavorite.id }
                    });
                }else{
                    await db.favorite.create({
                        data:{
                            itemId:itemId,
                            userId:session.user.userId,
                        }
                    });
                }
            });
            return true;
        }else{
            const tempFavoriteListId = await cookies().get(COOKIE_FAVORITE_KEY)?.value;
            if(tempFavoriteListId){
                const res = await db.$transaction(async(ts)=>{
                    const currentTempFavorite = await ts.tempFavorite.findFirst({
                        where:{
                            itemId:itemId,
                            tempFavoriteListId:tempFavoriteListId
                        }
                    });
                    if(currentTempFavorite){
                        await ts.tempFavorite.delete({
                            where:{ id:currentTempFavorite.id }
                        });
                    }else{
                        await db.tempFavorite.create({
                            data:{
                                itemId:itemId,
                                tempFavoriteListId:tempFavoriteListId
                            }
                        });
                    }
                });
                return true;
            }else{
                const newTempFavoriteList = await createMyTempFavoriteList();
                if(!newTempFavoriteList) return false;
                
                //save newTempFavoriteList in cookie
                await cookies().set({
                    name:COOKIE_FAVORITE_KEY,
                    value:newTempFavoriteList.id,
                    httpOnly:true,
                    secure:true,
                    sameSite:"lax",
                });

                const res = await addTempFavorite(itemId,newTempFavoriteList.id);
                return !!res;
            }
        }
    }
    catch(error){
        return false;
    }
}
