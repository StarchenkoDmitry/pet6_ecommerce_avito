'use server'

import { auth } from "@/config/authConfig";
import { cookies } from 'next/headers';
import { COOKIE_FAVORITE_KEY } from "../constants";
import { addMyFavorite, addTempFavorite, createMyTempFavoriteList } from "../services/favorite.service";
import db from "../db";


export async function addFavorite(itemId:string){
    try {
        console.log("addFavorite itemId: ",itemId);
        
        const session = await auth();
        console.log("addFavorite session: ",session);

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
                    console.log("RESSS: ",res);
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


// const favoriteId =  await cookies().set({
//     name:"TEST_ADD_FAVORITE",
//     value:`rand-${Math.random()}`,
//     httpOnly:true,
//     secure:true,
//     sameSite:"lax",
// });




export async function changeFavorite(itemId:string){
    try {
        console.log("changeFavorite itemId: ",itemId);
        
        const session = await auth();
        console.log("changeFavorite session: ",session);

        if(session){
            const res = await db.$transaction(async(ts)=>{
                const currentFavorite = await ts.myFavorite.findFirst({
                    where:{
                        itemId:itemId,
                        userId:session.user.userId
                    }
                });
                if(currentFavorite){
                    await ts.myFavorite.delete({
                        where:{ id:currentFavorite.id }
                    });
                }else{
                    await db.myFavorite.create({
                        data:{
                            itemId:itemId,
                            userId:session.user.userId,
                        }
                    });
                }
            });
            return true;
        }else{
            const myFavoriteListId = await cookies().get(COOKIE_FAVORITE_KEY)?.value;
            if(myFavoriteListId){
                const res = await db.$transaction(async(ts)=>{
                    const currentTempFavorite = await ts.myTempFavorite.findFirst({
                        where:{
                            itemId:itemId,
                            myFavoriteListId:myFavoriteListId
                        }
                    });
                    if(currentTempFavorite){
                        await ts.myTempFavorite.delete({
                            where:{ id:currentTempFavorite.id }
                        });
                    }else{
                        await db.myTempFavorite.create({
                            data:{
                                itemId:itemId,
                                myFavoriteListId:myFavoriteListId
                            }
                        });
                    }
                });
                return true;
            }else{
                const newMyFavoriteList = await createMyTempFavoriteList();
                if(!newMyFavoriteList) return false;
                
                //save newMyFavoriteListId in cookie
                await cookies().set({
                    name:COOKIE_FAVORITE_KEY,
                    value:newMyFavoriteList.id,
                    httpOnly:true,
                    secure:true,
                    sameSite:"lax",
                });

                const res = await addTempFavorite(itemId,newMyFavoriteList.id);
                return !!res;
            }
        }
    }
    catch(error){
        return false;
    }
}
