"use server"

import { File } from "buffer";
import db from "../db";
import { checkMaxAspectRation, convertByHeight } from "../image/converter";
import { 
    MAX_ASPECT_RATION_PICTURE, 
    MAX_COUNT_PICTURES, 
    MAX_ITEM_PRICE, 
    MIN_ITEM_PRICE, 
    MAX_SIZE_ITEM_DESCRIPTION, 
    MAX_SIZE_ITEM_LABLE, 
    MIN_SIZE_ITEM_LABLE, 
    PICTURE_SCALE_WIDTH_0, 
    PICTURE_SCALE_WIDTH_1, 
    PICTURE_SCALE_WIDTH_2, 
    PICTURE_SCALE_WIDTH_3, 
    MAX_TAKE_ITEMS
} from "../const";
import { ItemAndFavorite } from "../types/item";
import { getItemsForMainPage } from "../services/item.service";


export async function createItem(formData: FormData){
    try {
        console.log("createItem3");

        const user = await db.user.currentUser();
        
        if(!user)return;

        const lable = formData.get("lable");
        const priceStr = formData.get("price");
        const description = formData.get("description");
        const files: File[] = formData.getAll("files") as unknown as File[];


        if(typeof lable !== "string"){
            console.log("createItem lable is not string");
            return;
        }
        if(typeof priceStr !== "string"){
            console.log("createItem priceStr is not string");
            return;
        }        
        if(typeof description !== "string"){
            console.log("createItem description is not string");
            return;
        }

        if(
            lable.length > MAX_SIZE_ITEM_LABLE || 
            lable.length < MIN_SIZE_ITEM_LABLE){
                // console.log(`createItem lable lenght biggest ${MAX_SIZE_ITEM_LABLE} or less than ${MIN_SIZE_ITEM_LABLE}`);
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

//formatting images for different resolutions
async function formatFileToImageSacles(buffer:Buffer)
:Promise<ImageAndScales | undefined>{
    try {
        const b0 = await convertByHeight(buffer,PICTURE_SCALE_WIDTH_0);
        const b1 = await convertByHeight(buffer,PICTURE_SCALE_WIDTH_1);
        const b2 = await convertByHeight(buffer,PICTURE_SCALE_WIDTH_2);
        const b3 = await convertByHeight(buffer,PICTURE_SCALE_WIDTH_3);
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

export async function getItemsWithFavoriteWithQuery(
    take:number,
    skip:number,
    text:string)
:Promise<ItemAndFavorite[] | undefined>{
    try {
        if(skip < 0 || take < 0){ return; }
        if(take > MAX_TAKE_ITEMS){ return; }
        
        const items = await getItemsForMainPage(take,skip,text);
        return items;
    } catch (error) {
        console.log("getItemsWithFavoriteWithQuery error:",error);
    }
}
