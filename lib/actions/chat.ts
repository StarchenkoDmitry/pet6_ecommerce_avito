'use server'

//создание
//удаление

export async function createChat(userId:string){
    try {
        // const session = await auth();
        throw "todo";
    } catch (error) {
        return { error: "failed_request" }
    }
}

// const chatRes = await db.$transaction(async(ts)=>{
//     const existChat = await ts.chat.findFirst({
//         where:{
//             chatUsers:{
//                 some:{
//                    userId: 
//                 }
//             }
//         }
//     });
// });