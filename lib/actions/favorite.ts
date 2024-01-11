'use server'

import { auth } from "@/config/authConfig";


export async function addFavorite(itemId:string) {
    console.log("addFavorite itemId: ",itemId);
    
    
    const session = await auth();
    console.log("addFavorite session: ",session);

}