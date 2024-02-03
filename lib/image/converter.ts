import sharp from "sharp";
import { 
    CONVERT_TO_MAX_HEIGHT, 
    CONVERT_TO_MAX_WIDTH, 
    MAX_PIXELS_IN_PICTURE 
} from "../const";


export async function convertByWidth(imageBuffer:Buffer,maxWidth:number) {
    if(maxWidth >= CONVERT_TO_MAX_WIDTH) return;
    try {
        return await sharp(imageBuffer,{
            limitInputPixels:MAX_PIXELS_IN_PICTURE
        })
        .resize(maxWidth)
        .jpeg({ mozjpeg: true })
        .toBuffer();
    } catch (error) {
        console.log("convertByWidth error",error);
        return;
    }
}

export async function convertByHeight(imageBuffer:Buffer,maxHeight:number) {
    if(maxHeight >= CONVERT_TO_MAX_HEIGHT) return;
    try {
        return await sharp(imageBuffer,{
            limitInputPixels:MAX_PIXELS_IN_PICTURE
        })
        .resize(null,maxHeight)
        .jpeg({ mozjpeg: true })
        .toBuffer();
    } catch (error) {
        console.log("convertByHeight error",error);
        return;
    }
}

export async function checkMaxAspectRation(imageBuffer:Buffer,ration:number) {
    try {
        const meta = await sharp(imageBuffer,{
            limitInputPixels:MAX_PIXELS_IN_PICTURE
        }).metadata();
        // console.log("checkMaxAspectRation width,height",meta.width,meta.height);
        if(!meta.width || !meta.height)return false;
        const r1 = meta.width / meta.height;
        const r2 = meta.height / meta.width;
        // console.log("checkMaxAspectRation r1,r2",r1,r2,ration);
        return r1 <= ration && r2 <= ration;
    } catch (error) {
        console.log("checkMaxAspectRation error",error);
        return false;
    }
}
