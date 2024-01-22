"use server"

import { auth } from "@/config/authConfig";
import { checkMaxAspectRation } from "../image/converter";
import db from "../db";


// aspect ratio
const MAX_ASPECT_RATION = 5;
const MAX_SIZE_IMAGE = 1024*1024*8;//8MiB


export async function changeAvatar(formData: FormData){
    console.log("changeAvatar");

    try {
        const file = formData.get("file");
        console.log("changeAvatar file:",file);
        
        // check file on type of image/*
        const fileIsImage = 
            file 
            && typeof file === "object";
            // && file instanceof File
            // && file.type.includes("image/");

        if(!fileIsImage){
            return {error:"a file is not a image"};
        }

        const session = await auth();
        if(!session){
            return {error:"not authorized"};
        }
        // const { user } = session;
        // const { userId } = user;
        const userId = session.user.userId;
        
        if(file.size >= MAX_SIZE_IMAGE){
            return {error:"a file is larger than 8MiB"};
        }

        console.log("changeAvatar 0");
        const buffer: Buffer = Buffer.from(await file.arrayBuffer());

        console.log("changeAvatar 1");
        if(!(await checkMaxAspectRation(buffer,MAX_ASPECT_RATION))){
            return {error:`max aspect ration ${MAX_ASPECT_RATION}`};
        }

        console.log("changeAvatar 2");
        const result = await db.$transaction(async(ts)=>{
            const userUpdated = await ts.user.update({
                data:{
                    image:{
                        create:{
                            buffer:buffer,
                            size:buffer.byteLength,
                        }
                    }
                },
                where:{
                    id:userId
                }
            })
            return userUpdated;
        });
        return {
            statusOk:!!result,
        }
    } catch (error) {
        console.log('Action createItem error:',error);
        return { error:"error" };
    }
}




export async function changeName(name:string){
    try {
        console.log("setName: ",name);

        const session = await auth();

        if(!session){
            return {error:"not authorized"};
        }

        const userId = session.user.userId;
        
        const result = await db.$transaction(async(ts)=>{
            const userUpdated = await ts.user.update({
                data:{
                    name:name,
                },
                where:{
                    id:userId
                }
            })
            return userUpdated;
        });
        return !!result;    
    } catch (error) {
        return false;
    }
}