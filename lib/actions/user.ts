"use server"

import db from "../db";

import { 
    checkMaxAspectRation, 
    convertByWidth 
} from "../image/converter";

import { 
    AVATAR_SCALE_WIDTH_0, 
    AVATAR_SCALE_WIDTH_1, 
    MAX_ASPECT_RATION_AVATAR,
    MAX_FILE_SIZE_AVATAR 
} from "../const";


export async function changeAvatar(formData: FormData){
    try {
        console.log("changeAvatar");

        const user = await db.user.currentUser();
        if(!user){
            return {error:"not authorized"};
        }
        const userId = user.id;

        const file = formData.get("file");

        if( !file 
            || typeof file !== "object" 
            // || !(file instanceof File)
            || !file.type.includes("image/")){
            return {error:"a file is not an image"};
        }

        if(file.size >= MAX_FILE_SIZE_AVATAR){
            return {error:"an image is larger than 8MiB"};
        }

        const buffer: Buffer = Buffer.from(await file.arrayBuffer());

        if(!(await checkMaxAspectRation(buffer,MAX_ASPECT_RATION_AVATAR))){
            return {error:`max aspect ration ${MAX_ASPECT_RATION_AVATAR}`};
        }
        

        const b0 = await convertByWidth(buffer,AVATAR_SCALE_WIDTH_0);
        const b1 = await convertByWidth(buffer,AVATAR_SCALE_WIDTH_1);

        if(!b0 || !b1){
            return {error:`failed to convert an image`};
        }

        const result = await db.$transaction(async(ts)=>{
            const userBefore = await ts.user.findFirst({
                where:{id:userId}
            });
            if(!userBefore){
                return;
            }
            console.log("changeAvatar userAvatar:",userBefore);
            const avatar = await ts.avatarImage.create({
                data:{
                    buffer:buffer,
                    buffer0:b0,
                    buffer1:b1,
                    size:buffer.byteLength,
                    size0:b0.byteLength,
                    size1:b1.byteLength,
                }
            });
            const userUpdated = await ts.user.update({
                data:{
                    imageId:avatar.id
                },
                where:{ id:userId }
            })
            if(userBefore.imageId){
                const deleted = await ts.avatarImage.delete({
                    where:{
                        id:userBefore.imageId
                    }
                });
                console.log("changeAvatar deleted:",deleted);
            }
            console.log("changeAvatar userUpdated:",userUpdated);
            return avatar;
        });
        return {
            status:!!result,
        }
    } catch (error) {
        console.log('Action createItem error:',error);
        return { error:"error" };
    }
}


export async function changeName(name:string){
    try {
        console.log("changeName: ",name);

        const user = await db.user.currentUser();

        if(!user){
            return {error:"not authorized"};
        }

        const result = await db.$transaction(async(ts)=>{
            const userUpdated = await ts.user.update({
                data:{
                    name:name,
                },
                where:{
                    id:user.id
                }
            })
            return userUpdated;
        });
        return !!result;    
    } catch (error) {
        return false;
    }
}


export async function changeSurname(surname:string){
    try {
        console.log("changeSurname: ",surname);

        const user = await db.user.currentUser();

        if(!user){
            return {error:"not authorized"};
        }
        
        const result = await db.$transaction(async(ts)=>{
            const userUpdated = await ts.user.update({
                data:{
                    surname:surname,
                },
                where:{
                    id:user.id
                }
            })
            return userUpdated;
        });
        return !!result;    
    } catch (error) {
        return false;
    }
}
