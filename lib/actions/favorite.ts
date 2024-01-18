'use server'

import { auth } from "@/config/authConfig";
import { cookies } from 'next/headers';
import { COOKIE_FAVORITE_KEY } from "../constants";
import { addMyFavorite, addTempFavorite, createMyTempFavoriteList } from "../services/favorite.service";


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
