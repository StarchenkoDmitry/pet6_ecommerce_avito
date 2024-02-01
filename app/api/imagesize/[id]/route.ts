import { 
    PICTURE_SCALE_HEIGHT_0,
    PICTURE_SCALE_HEIGHT_1,
    PICTURE_SCALE_HEIGHT_2,
    PICTURE_SCALE_HEIGHT_3 
} from "@/lib/const";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const searchParams = req.nextUrl.searchParams
        const heightStr = searchParams.get('h')
        const id = params.id;

        console.log("ID: ",id);
        console.log("height: ",heightStr);

        if(!heightStr){
            const image = await db.itemImage.findFirst({
                where:{ id:id },select:{ buffer:true }
            });
            
            if(image){
                return new NextResponse(image.buffer);
            }
        }else{
            const height = parseInt(heightStr);
            if(!Number.isFinite(height)){
                return new NextResponse(null,{status:400});
            }

            if(height <= PICTURE_SCALE_HEIGHT_3){
                const image = await db.itemImage.findFirst({
                    where:{ id:id },select:{ buffer3:true }
                });
                if(image){
                    return new NextResponse(image.buffer3);
                }
            }else if(height <= PICTURE_SCALE_HEIGHT_2){
                const image = await db.itemImage.findFirst({
                    where:{ id:id },select:{ buffer2:true }
                });
                if(image){
                    return new NextResponse(image.buffer2);
                }
            }else if(height <= PICTURE_SCALE_HEIGHT_1){
                const image = await db.itemImage.findFirst({
                    where:{ id:id },select:{ buffer1:true }
                });
                if(image){
                    return new NextResponse(image.buffer1);
                }
            }else if(height <= PICTURE_SCALE_HEIGHT_0){
                const image = await db.itemImage.findFirst({
                    where:{ id:id },select:{ buffer0:true }
                });
                if(image){
                    return new NextResponse(image.buffer0);
                }
            }else{
                const image = await db.itemImage.findFirst({
                    where:{ id:id },select:{ buffer:true }
                });
                if(image){
                    return new NextResponse(image.buffer);
                }
            }
        }
        return new NextResponse(null,{status:404});
    } catch (error) {
        console.log("route api/imagesize/[id] error:",error);
        return new NextResponse(null,{status:404});
    }
}
