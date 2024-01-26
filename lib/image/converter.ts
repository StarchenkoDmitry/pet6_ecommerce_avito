import sharp from "sharp";

const MAX_WIDTH = 4*1024;
const MAX_HEIGHT = 4*1024;

const MAX_PIXELS = MAX_WIDTH * MAX_HEIGHT;
// const MAX_PIXELS = 10 * 10;


const CONVERT_TO_MAX_WIDTH = 1024*16;
const CONVERT_TO_MAX_HEIGHT = 1024*16;


export async function convertByWidth(imageBuffer:Buffer,maxWidth:number) {
    if(maxWidth >= CONVERT_TO_MAX_WIDTH) return;
    try {
        return await sharp(imageBuffer,{
            limitInputPixels:MAX_PIXELS
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
            limitInputPixels:MAX_PIXELS
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
            limitInputPixels:MAX_PIXELS
        }).metadata();
        if(!meta.width || !meta.height)return false;
        const r1 = meta.width / meta.height;
        const r2 = meta.height / meta.width;
        return r1 <= ration && r2 <= ration;
    } catch (error) {
        console.log("checkMaxAspectRation error",error);
        return false;
    }
}




// export async function convertImage(buffer:Buffer) {
//     try {
//         let res =  await sharp(buffer,{
//             limitInputPixels:MAX_PIXELS
//         });
//         // res = res.rotate(40);
//         res = res.resize(null,105);
//         res = res.jpeg({ mozjpeg: true });
//         const result = res.toBuffer();

//         return result;
//     } catch (error) {
//         return;
//     }
// }


        // res.metadata(function(err, info) {
        //     console.log('Image info:' + JSON.stringify(info));
        // });
        // let res2 = await res.rotate(90)


// export async function convertImage(buffer:Buffer) {
//     return await sharp(buffer)
//     .rotate(90)
//     // .resize(200)
//     .jpeg({ mozjpeg: true })
//     .toBuffer();
// }
