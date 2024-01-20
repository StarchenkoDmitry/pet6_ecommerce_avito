"use server"

import { File } from "buffer";
import db from "../db";
import { convertByHeight } from "../image/converter";


const MAX_WIDTH_IMAGE_LEVEL_0 = 100;
const MAX_WIDTH_IMAGE_LEVEL_1 = 256;
const MAX_WIDTH_IMAGE_LEVEL_2 = 512;


const MAX_SIZE_IMAGE = 1024*1024*8;//8MiB


export async function createItem(formData: FormData){
    console.log("createItem");

    try {
        const lable = formData.get("lable");
        const price = formData.get("price");
        const file = formData.get("file");
        
        if(
            typeof lable !== "string" ||
            typeof price !== "string"
        ){
            return {error:"no corect data"};
        }

        // check file on type of image/*
        const imageExist = 
            typeof file === "object" && 
            file instanceof File && 
            file.type.includes("image/");
        
        let buffer : Buffer | undefined = undefined;

        if(imageExist){
            buffer = Buffer.from(await file.arrayBuffer());
            buffer = await convertByHeight(buffer,MAX_WIDTH_IMAGE_LEVEL_0);

            console.log('bufferbufferbuffer', typeof buffer);
            if(!buffer){
                return {error:"failed_convert_image"};
            }

            if(buffer.byteLength > MAX_SIZE_IMAGE){
                return {error:"a file is larger than 8MiB"};
            }
        }
        
        const itemRes = await db.$transaction(async(ctx)=>{
            if(imageExist && buffer){
                const imageRes = await db.image.create({
                    data:{
                        type: file.type,
                        size: buffer.byteLength,
                        buffer: buffer,
                    }
                })
                const itemRes = await ctx.item.create({
                    data:{
                        lable:lable,
                        price:parseInt(price),
                        imageId:imageRes.id,
                    }
                })
                return itemRes;
            }else{
                const itemRes = await ctx.item.create({
                    data:{
                        lable:lable,
                        price:parseInt(price),
                    }
                })
                return itemRes;
            }
        });
        
        return { statusOk: !!itemRes };
    } catch (error) {
        console.log('bufferbufferbuffer',error);
        return { error:"error" };
    }
}





// export async function createItem(formData: FormData){   
//     console.log("createItem");

//     try {
//         const lable = formData.get("lable");
//         const price = formData.get("price");
//         const file = formData.get("file");

//         if(
//             typeof lable !== "string" ||
//             typeof price !== "string" ||
//             typeof file !== "object" || 
//             !(file instanceof File)
//         ){
//             return {error:"no corect data"}
//         }

//         // check file on type of image/* 
//         if(!file.type.includes("image/")){
//             return {error:"a file is not image"};
//         }

//         const array = await file.arrayBuffer();
//         const buffer = Buffer.from(array);

//         if(buffer.byteLength > MAX_SIZE_IMAGE){
//             return {error:`a file is larger than 8MiB`};
//         }

//         const itemRes = await db.$transaction(async(ctx)=>{
//             const imageRes = await db.image.create({
//                 data:{
//                     type: file.type,
//                     size: buffer.byteLength,
//                     buffer: buffer,
//                 }
//             })

//             const itemRes = await ctx.item.create({
//                 data:{
//                     lable:lable,
//                     price:parseInt(price),
//                     imageId:imageRes.id,
//                 }
//             })

//             return itemRes;
//         });
        
//         return { statusOk: !!itemRes };
//     } catch (error) {
//         return { error:"error" };
//     }
// }



        // const resCreated = await db.image.create({
        //     data:{
        //         size: buffer.byteLength,
        //         buffer: buffer
        //     }
        // })