"use server"

import { File } from "buffer";
import db from "../db";
import { convertByHeight } from "../image/converter";



const MAX_WIDTH_AVATAR_IMAGE_LEVEL_0 = 64;
const MAX_WIDTH_AVATAR_IMAGE_LEVEL_1 = 256;


const MAX_WIDTH_IMAGE_LEVEL_0 = 100;
const MAX_WIDTH_IMAGE_LEVEL_1 = 256;
const MAX_WIDTH_IMAGE_LEVEL_2 = 512;

const MAX_K_WIDTH_HEIGHT = 10;


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
        
        let buffer: Buffer | undefined = undefined;
        let buffer0: Buffer | undefined = undefined;
        let buffer1: Buffer | undefined = undefined;
        let buffer2: Buffer | undefined = undefined;

        if(imageExist){
            buffer = Buffer.from(await file.arrayBuffer());
            buffer0 = await convertByHeight(buffer,MAX_WIDTH_IMAGE_LEVEL_0);
            buffer1 = await convertByHeight(buffer,MAX_WIDTH_IMAGE_LEVEL_1);
            buffer2 = await convertByHeight(buffer,MAX_WIDTH_IMAGE_LEVEL_2);

            console.log('bufferbufferbuffer', typeof buffer);
            if(!buffer0 || !buffer1 || !buffer2){
                return {error:"failed_convert_image"};
            }

            if(buffer.byteLength > MAX_SIZE_IMAGE){
                return {error:"a file is larger than 8MiB"};
            }
        }else return;
        
        const itemRes = await db.$transaction(async(ctx)=>{
            if(imageExist && buffer){
                const imageRes = await db.itemImage.create({
                    data:{
                        size: buffer.byteLength,
                        buffer: buffer,
                        buffer0:buffer0,
                        buffer1:buffer1,
                        buffer2:buffer2,
                        size0:0,
                        size1:0,
                        size2:0,
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