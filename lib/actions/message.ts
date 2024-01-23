'use server'

import db from "../db"

//создание
//удаление

export async function createMessage(chatId:string,text:string){
    try {
        const user = await db.user.currentUser();
        if(!user) return
    } catch (error) {
        return { error: "failed_request" }
    }
}
