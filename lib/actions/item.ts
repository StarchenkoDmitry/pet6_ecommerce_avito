"use server"

import { File } from "buffer";
import db from "../db";
import { checkMaxAspectRation, convertByHeight } from "../image/converter";
import { auth } from "@/config/authConfig";
import { MAX_COUNT_PICTURES, MAX_ITEM_PRICE, MAX_SIZE_ITEM_DESCRIPTION, MAX_SIZE_ITEM_LABLE, MIN_ITEM_PRICE, MIN_SIZE_ITEM_DESCRIPTION, MIN_SIZE_ITEM_LABLE } from "../constants";



const MAX_WIDTH_AVATAR_IMAGE_LEVEL_0 = 64;
const MAX_WIDTH_AVATAR_IMAGE_LEVEL_1 = 256;


const MAX_WIDTH_IMAGE_LEVEL_0 = 100;
const MAX_WIDTH_IMAGE_LEVEL_1 = 256;
const MAX_WIDTH_IMAGE_LEVEL_2 = 512;

// aspect ratio
const MAX_ASPECT_RATION = 5;


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
        const fileIsImage = 
            typeof file === "object" && 
            file instanceof File && 
            file.type.includes("image/");

        const session = await auth();
        if(!session){
            return {error:"not authorized"};
        }
        const { user } = session;
        const { userId } = user;
        
        if(fileIsImage){
            if(file.size >= MAX_SIZE_IMAGE){
                return {error:"a file is larger than 8MiB"};
            }
    
            const buffer: Buffer = Buffer.from(await file.arrayBuffer());

            if(!(await checkMaxAspectRation(buffer,MAX_ASPECT_RATION))){
                return {error:`max aspect ration ${MAX_ASPECT_RATION}`};
            }

            const buffer0: Buffer | undefined = await convertByHeight(buffer,MAX_WIDTH_IMAGE_LEVEL_0);
            const buffer1: Buffer | undefined = await convertByHeight(buffer,MAX_WIDTH_IMAGE_LEVEL_1);
            const buffer2: Buffer | undefined = await convertByHeight(buffer,MAX_WIDTH_IMAGE_LEVEL_2);
            
            if(!buffer0 || !buffer1 || !buffer2){
                return {error:"failed convert image"};
            }
            
            if(
                buffer0.byteLength >= MAX_SIZE_IMAGE ||
                buffer1.byteLength >= MAX_SIZE_IMAGE ||
                buffer2.byteLength >= MAX_SIZE_IMAGE
            ){
                return {error:"a converted file is larger than 8MiB"};
            }

            const itemRes = await db.$transaction(async(ctx)=>{
                const imageRes = await db.itemImage.create({
                    data:{
                        buffer: buffer,
                        size: buffer.byteLength,

                        buffer0:buffer0,
                        buffer1:buffer1,
                        buffer2:buffer2,
                        size0:buffer0.byteLength,
                        size1:buffer1.byteLength,
                        size2:buffer2.byteLength,
                    }
                })
                const itemRes = await ctx.item.create({
                    data:{
                        lable:lable,
                        price:parseInt(price),
                        imageId:imageRes.id,
                        userId:userId,
                    }
                })
                return itemRes;
            });
            return { statusOk: !!itemRes };
        }else{
            const itemRes = await db.$transaction(async(ctx)=>{
                const itemRes = await ctx.item.create({
                    data:{
                        lable:lable,
                        price:parseInt(price),
                        userId:userId,
                    }
                })
                return itemRes;
            });
            return { statusOk: !!itemRes };
        }        
    } catch (error) {
        console.log('Action createItem error:',error);
        return { error:"error" };
    }
}


// lable2: File {
//     size: 103947,
//     type: 'image/jpeg',
//     name: 'jpg1851117301.jpg',
//     lastModified: 1706292465540
//   }

export async function createItem3(formData: FormData){
    try {
        console.log("createItem2");
        
        const lable = formData.get("lable");
        const priceStr = formData.get("price");
        const description = formData.get("description");
        const files: File[] = formData.getAll("files") as unknown as File[];


        if(typeof lable !== "string"){
            return;
        }
        if(typeof priceStr !== "string"){
            return;
        }        
        if(typeof description !== "string"){
            return;
        }

        if(
            lable.length > MAX_SIZE_ITEM_LABLE || 
            lable.length < MIN_SIZE_ITEM_LABLE){
            return;
        }

        if(
            description.length > MAX_SIZE_ITEM_DESCRIPTION){
            return;
        }

        const price = parseFloat(priceStr);
        if(price > MAX_ITEM_PRICE || price < MIN_ITEM_PRICE){
            return;
        }

        if(files.length > MAX_COUNT_PICTURES){
            return;
        }

        if(files.find(f=>!(f instanceof File))){
            return;
        }

        const images = await formatFilesToImagesWithDifferentResolutions(files);


        // console.log("lable:",lable);
        // // console.log("lable2:",files2);
        // console.log("Filess:",typeof files);
        // console.log("Filess lenght3:",files3.length);
        // console.log("Filess lenght:",files.length);
        // // console.log("Filess lenght2:",files2.length);
        // console.log("Filess instanceof:",files instanceof File);
        
    } catch (error) {
        console.log("createItem2 error:",error);
        
    }
}


type ImageFI = {
    buffer:Buffer;
}

//formatting images for different resolutions
async function formatFilesToImagesWithDifferentResolutions(files:File[]){

}



        // check file on type of image/*
        // const fileIsImage = 
        //     typeof file === "object" && 
        //     file instanceof File && 
        //     file.type.includes("image/");





        // export async function createItem3(formData: FormData){
        //     try {
        //         console.log("createItem2");
                
        //         const lable = formData.get("lable");
        //         const files: File[] = formData.get("files") as unknown as File[];
        //         const files3: File[] = formData.getAll("files") as unknown as File[];
        //         // const files2: File[] = formData.get("files[]") as unknown as File[];
                
        //         console.log("lable:",lable);
        //         // console.log("lable2:",files2);
        //         console.log("Filess:",typeof files);
        //         console.log("Filess lenght3:",files3.length);
        //         console.log("Filess lenght:",files.length);
        //         // console.log("Filess lenght2:",files2.length);
        //         console.log("Filess instanceof:",files instanceof File);
                
        //     } catch (error) {
        //         console.log("createItem2 error:",error);
                
        //     }
        // }
        







// export type CreateItemProps = {
//     lable:string;
//     price:string;
//     description:string;
//     files:File[];
// }

// export async function createItem2({
//     files,
//     lable,
// }: CreateItemProps){
//     try {
//         console.log("createItem2");
        
//         // check file on type of image/*
//         // const fileIsImage = 
//         //     typeof file === "object" && 
//         //     file instanceof File && 
//         //     file.type.includes("image/");
        
//         console.log("lable:",lable);
//         console.log("Filess:",typeof files);
//         console.log("Filess instanceof:",files instanceof File);
        
//     } catch (error) {
//         console.log("createItem2 error:",error);
        
//     }
// }













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
        
//         if(fileIsImage){
//             if(file.size >= MAX_SIZE_IMAGE){
//                 return {error:"a file is larger than 8MiB"};
//             }
    
//             const buffer: Buffer = Buffer.from(await file.arrayBuffer());

//             if(!(await checkMaxAspectRation(buffer,MAX_ASPECT_RATION))){
//                 return {error:`max aspect ration ${MAX_ASPECT_RATION}`};
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
//         const imageExist = 
//             typeof file === "object" && 
//             file instanceof File && 
//             file.type.includes("image/");
        
//         if(!imageExist){
//             return {error: "a file is not a image"};
//         }

//         if(file.size >= MAX_SIZE_IMAGE){
//             return {error:"a file is larger than 8MiB"};
//         }

//         let buffer: Buffer = Buffer.from(await file.arrayBuffer());
//         let buffer0: Buffer | undefined = await convertByHeight(buffer,MAX_WIDTH_IMAGE_LEVEL_0);
//         let buffer1: Buffer | undefined = await convertByHeight(buffer,MAX_WIDTH_IMAGE_LEVEL_1);
//         let buffer2: Buffer | undefined = await convertByHeight(buffer,MAX_WIDTH_IMAGE_LEVEL_2);
        
//         if(!buffer0 || !buffer1 || !buffer2){
//             return {error:"failed_convert_image"};
//         }
        
//         if(
//             buffer0.byteLength >= MAX_SIZE_IMAGE ||
//             buffer1.byteLength >= MAX_SIZE_IMAGE ||
//             buffer2.byteLength >= MAX_SIZE_IMAGE
//         ){
//             return {error:"a converted file is larger than 8MiB"};
//         }

//         const itemRes = await db.$transaction(async(ctx)=>{
//             if(imageExist && buffer){
//                 const imageRes = await db.itemImage.create({
//                     data:{
//                         size: buffer.byteLength,
//                         buffer: buffer,
//                         buffer0:buffer0 as Buffer,
//                         buffer1:buffer1 as Buffer,
//                         buffer2:buffer2 as Buffer,
//                         size0:buffer0.byteLength,
//                         size1:0,
//                         size2:0,
//                     }
//                 })
//                 const itemRes = await ctx.item.create({
//                     data:{
//                         lable:lable,
//                         price:parseInt(price),
//                         imageId:imageRes.id,
//                     }
//                 })
//                 return itemRes;
//             }else{
//                 const itemRes = await ctx.item.create({
//                     data:{
//                         lable:lable,
//                         price:parseInt(price),
//                     }
//                 })
//                 return itemRes;
//             }
//         });
        
//         return { statusOk: !!itemRes };
//     } catch (error) {
//         console.log('bufferbufferbuffer',error);
//         return { error:"error" };
//     }
// }





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