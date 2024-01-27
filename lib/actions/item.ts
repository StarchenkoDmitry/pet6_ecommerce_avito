"use server"

import { File } from "buffer";
import db from "../db";
import { checkMaxAspectRation, convertByHeight } from "../image/converter";
import { auth } from "@/config/authConfig";
import { MAX_ASPECT_RATION_PICTURE, MAX_COUNT_PICTURES, MAX_ITEM_PRICE, MAX_SIZE_ITEM_DESCRIPTION, MAX_SIZE_ITEM_LABLE, MIN_ITEM_PRICE, MIN_SIZE_ITEM_LABLE, PICTURE_SCALE_HEIGHT_0, PICTURE_SCALE_HEIGHT_1, PICTURE_SCALE_HEIGHT_2, PICTURE_SCALE_HEIGHT_3 } from "../constants";



// const MAX_WIDTH_IMAGE_LEVEL_0 = 100;
// const MAX_WIDTH_IMAGE_LEVEL_1 = 256;
// const MAX_WIDTH_IMAGE_LEVEL_2 = 512;

// const MAX_SIZE_IMAGE = 1024*1024*8;//8MiB

// export async function createItem(formData: FormData){
//     console.log("createItem");

//     try {
//         const lable = formData.get("lable");
//         const price = formData.get("price");
//         const file = formData.get("file");
        
//         if(
//             typeof lable !== "string" ||
//             typeof price !== "string"
//         ){
//             return {error:"no corect data"};
//         }

//         // check file on type of image/*
//         const fileIsImage = 
//             typeof file === "object" && 
//             file instanceof File && 
//             file.type.includes("image/");

//         const session = await auth();
//         if(!session){
//             return {error:"not authorized"};
//         }
//         const { user } = session;
//         const { userId } = user;
        
//         if(fileIsImage){
//             if(file.size >= MAX_SIZE_IMAGE){
//                 return {error:"a file is larger than 8MiB"};
//             }
    
//             const buffer: Buffer = Buffer.from(await file.arrayBuffer());

//             if(!(await checkMaxAspectRation(buffer,MAX_ASPECT_RATION_PICTURE))){
//                 return {error:`max aspect ration ${MAX_ASPECT_RATION_PICTURE}`};
//             }

//             const buffer0: Buffer | undefined = await convertByHeight(buffer,MAX_WIDTH_IMAGE_LEVEL_0);
//             const buffer1: Buffer | undefined = await convertByHeight(buffer,MAX_WIDTH_IMAGE_LEVEL_1);
//             const buffer2: Buffer | undefined = await convertByHeight(buffer,MAX_WIDTH_IMAGE_LEVEL_2);
            
//             if(!buffer0 || !buffer1 || !buffer2){
//                 return {error:"failed convert image"};
//             }
            
//             if(
//                 buffer0.byteLength >= MAX_SIZE_IMAGE ||
//                 buffer1.byteLength >= MAX_SIZE_IMAGE ||
//                 buffer2.byteLength >= MAX_SIZE_IMAGE
//             ){
//                 return {error:"a converted file is larger than 8MiB"};
//             }

//             const itemRes = await db.$transaction(async(ctx)=>{
//                 const imageRes = await db.itemImage.create({
//                     data:{
//                         buffer: buffer,
//                         size: buffer.byteLength,

//                         buffer0:buffer0,
//                         buffer1:buffer1,
//                         buffer2:buffer2,
//                         size0:buffer0.byteLength,
//                         size1:buffer1.byteLength,
//                         size2:buffer2.byteLength,
//                     }
//                 })
//                 const itemRes = await ctx.item.create({
//                     data:{
//                         lable:lable,
//                         price:parseInt(price),
//                         imageId:imageRes.id,
//                         userId:userId,
//                     }
//                 })
//                 return itemRes;
//             });
//             return { statusOk: !!itemRes };
//         }else{
//             const itemRes = await db.$transaction(async(ctx)=>{
//                 const itemRes = await ctx.item.create({
//                     data:{
//                         lable:lable,
//                         price:parseInt(price),
//                         userId:userId,
//                     }
//                 })
//                 return itemRes;
//             });
//             return { statusOk: !!itemRes };
//         }        
//     } catch (error) {
//         console.log('Action createItem error:',error);
//         return { error:"error" };
//     }
// }


// File {
//     size: 103947,
//     type: 'image/jpeg',
//     name: 'jpg1851117301.jpg',
//     lastModified: 1706292465540
//   }

export async function createItem3(formData: FormData){
    try {
        console.log("createItem3");

        const user = await db.user.currentUser();
        
        if(!user)return;

        const lable = formData.get("lable");
        const priceStr = formData.get("price");
        const description = formData.get("description");
        const files: File[] = formData.getAll("files") as unknown as File[];


        if(typeof lable !== "string"){
            console.log("createItem3_0");
            return;
        }
        if(typeof priceStr !== "string"){
            console.log("createItem3_1");
            return;
        }        
        if(typeof description !== "string"){
            console.log("createItem3_2");
            return;
        }

        if(
            lable.length > MAX_SIZE_ITEM_LABLE || 
            lable.length < MIN_SIZE_ITEM_LABLE){
                console.log("createItem3_3");
            return;
        }

        if(description.length > MAX_SIZE_ITEM_DESCRIPTION){
            console.log("createItem3_4");
            return;
        }

        const price = parseFloat(priceStr);
        if(price > MAX_ITEM_PRICE || price < MIN_ITEM_PRICE){
            console.log("createItem3_5");
            return;
        }

        if(files.length > MAX_COUNT_PICTURES){
            console.log("createItem3_6");
            return;
        }

        if(files.find(f=>!(f instanceof File))){
            console.log("createItem3_7");
            return;
        }
        
        const arraybuffers = await Promise.all(files.map(async (f)=>f.arrayBuffer()));
        const buffers = arraybuffers.map(ab=>Buffer.from(ab));
        

        for (let i = 0; i < arraybuffers.length; i++) {
            if(!await checkMaxAspectRation(buffers[i],MAX_ASPECT_RATION_PICTURE)){
                console.log("createItem3_8");
                return;
            }
        }

        const imagesRes = await Promise.all(buffers.map(async(b)=>formatFileToImageSacles(b)));
        const images:ImageAndScales[] = [];
        for (let i = 0; i < imagesRes.length; i++) {
            const img = imagesRes[i];
            if(!img){
                return;
            }
            else{
                images.push(img);
            }
        }

        // const image = images[0];
        
        const itemRes = await db.$transaction(async(ts)=>{
            const imagesDB = [];
            for (let i = 0; i < images.length; i++) {
                const image = images[i];
                const imageDB = await ts.itemImage.create({
                    data:{
                        buffer:image.buffer,
                        buffer0:image.buffer0,
                        buffer1:image.buffer1,
                        buffer2:image.buffer2,
                        buffer3:image.buffer3,
    
                        size:image.buffer.length,
                        size0:image.buffer0.length,
                        size1:image.buffer1.length,
                        size2:image.buffer2.length,
                        size3:image.buffer3.length,
                    }
                });
                imagesDB.push(imageDB);
            }

            if(imagesDB.length>0){
                const img = imagesDB[0];
                const itemRes = await ts.item.create({
                    data:{
                        lable:lable,
                        price:price,
                        description:description,
                        mainImageId:img.id,
                        userId:user.id,
                        images:{
                            connect:imagesDB.map(e=>({
                                id:e.id
                            }))
                        }
                    }
                })
                return itemRes;
            }else{
                const itemRes = await ts.item.create({
                    data:{
                        lable:lable,
                        price:price,
                        description:description,
                        userId:user.id,
                    }
                })
                return itemRes;
            }
        });
        return itemRes;
    } catch (error) {
        console.log("createItem3 error:",error);
        return;
    }
}


type ImageAndScales = {
    buffer:Buffer;
    buffer0:Buffer;
    buffer1:Buffer;
    buffer2:Buffer;
    buffer3:Buffer;
}

//formatting images for different resolutions "formatFilesToImagesWithDifferentResolutions"
async function formatFileToImageSacles(buffer:Buffer)
:Promise<ImageAndScales | undefined>{
    try {
        const b0 = await convertByHeight(buffer,PICTURE_SCALE_HEIGHT_0);
        const b1 = await convertByHeight(buffer,PICTURE_SCALE_HEIGHT_1);
        const b2 = await convertByHeight(buffer,PICTURE_SCALE_HEIGHT_2);
        const b3 = await convertByHeight(buffer,PICTURE_SCALE_HEIGHT_3);
        if(!b0 || !b1 || !b2 || !b3)return;

        const img : ImageAndScales = {
            buffer:buffer,
            buffer0:b0,
            buffer1:b1,
            buffer2:b2,
            buffer3:b3,
        }
        return img;
    } catch (error) {
        console.log("formatFileToImageSacles error:",error);
        return;
    }
}



                            // connect://[
                            // {
                            //     buffer:img.buffer,
                            //     buffer0:img.buffer0,
                            //     buffer1:img.buffer1,
                            //     buffer2:img.buffer2,
                            //     buffer3:img.buffer3,
            
                            //     size:img.buffer.length,
                            //     size0:img.buffer0.length,
                            //     size1:img.buffer1.length,
                            //     size2:img.buffer2.length,
                            //     size3:img.buffer3.length,
                            // }
                        //]
                            // [
                            //     imagesDB.map(e=>({
                            //         buffer:e.buffer,
                            //         buffer0:e.buffer0,
                            //         buffer1:e.buffer1,
                            //         buffer2:e.buffer2,
                            //         buffer3:e.buffer3,
                            //         size:image.buffer.length,
                            //         size0:image.buffer.length,
                            //         size1:image.buffer.length,
                            //         size2:image.buffer.length,
                            //         size3:image.buffer.length,
                            //     }))
                            // ]