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
        
        // check file on type of image/*
        const fileIsImage = 
            typeof file === "object" &&
            file instanceof File &&
            file.type.includes("image/");

        if(!fileIsImage){
            return {error:"a file is not a image"};
        }

        const session = await auth();
        if(!session){
            return {error:"not authorized"};
        }
        const { user } = session;
        const { userId } = user;
        
        if(file.size >= MAX_SIZE_IMAGE){
            return {error:"a file is larger than 8MiB"};
        }

        const buffer: Buffer = Buffer.from(await file.arrayBuffer());

        if(!(await checkMaxAspectRation(buffer,MAX_ASPECT_RATION))){
            return {error:`max aspect ration ${MAX_ASPECT_RATION}`};
        }

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
        return !!result;
    } catch (error) {
        console.log('Action createItem error:',error);
        return { error:"error" };
    }
}
