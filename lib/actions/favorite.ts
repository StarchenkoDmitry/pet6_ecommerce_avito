'use server'

import { auth } from "@/config/authConfig";
import { cookies } from 'next/headers';
import { addFavoriteToMyFavoriteList, createMyFavoriteList } from "../services/favorite.service";
import { COOKIE_FAVORITE_KEY } from "../constants";



export async function addFavorite(itemId:string){
    try {
        console.log("addFavorite itemId: ",itemId);
        
        const session = await auth();
        console.log("addFavorite session: ",session);

        if(session){
            throw new Error("need to do code... :D ");
        }else{
            const myFavoriteListId = await cookies().get(COOKIE_FAVORITE_KEY)?.value;
            if(myFavoriteListId){
                const res = await addFavoriteToMyFavoriteList(itemId,myFavoriteListId);
                return { ok: !!res };
            }else{
                const newMyFavoriteList = await createMyFavoriteList();

                if(newMyFavoriteList){
                    //save newMyFavoriteListId in cookie
                    await cookies().set({
                        name:COOKIE_FAVORITE_KEY,
                        value:newMyFavoriteList.id,
                        httpOnly:true,
                        secure:true,
                        sameSite:"lax",
                    });
                    
                    const res = await addFavoriteToMyFavoriteList(itemId,newMyFavoriteList.id);
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
