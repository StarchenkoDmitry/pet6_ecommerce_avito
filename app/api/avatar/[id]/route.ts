import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { 
    AVATAR_SCALE_WIDTH_0,
    AVATAR_SCALE_WIDTH_1,
} from "@/constants";


export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const searchParams = req.nextUrl.searchParams
        const widthStr = searchParams.get('w')
        const id = params.id;

        console.log("ID: ",id);
        console.log("width: ",widthStr);

        if(!widthStr){
            const image = await db.avatarImage.findFirst({
                where:{ id:id },select:{ buffer:true }
            });
            
            if(image){
                return new NextResponse(image.buffer);
            }
        }else{
            const width = parseInt(widthStr);
            if(!Number.isFinite(width)){
                return new NextResponse(null,{status:400});
            }

            if(width <= AVATAR_SCALE_WIDTH_1){
                const image = await db.avatarImage.findFirst({
                    where:{ id:id },select:{ buffer1:true }
                });
                if(image){
                    return new NextResponse(image.buffer1);
                }
            }else if(width <= AVATAR_SCALE_WIDTH_0){
                const image = await db.avatarImage.findFirst({
                    where:{ id:id },select:{ buffer0:true }
                });
                if(image){
                    return new NextResponse(image.buffer0);
                }
            }else{
                const image = await db.avatarImage.findFirst({
                    where:{ id:id },select:{ buffer:true }
                });
                if(image){
                    return new NextResponse(image.buffer);
                }
            }
        }
        return new NextResponse(null,{status:404});
    } catch (error) {
        console.log("route api/image/[id] error:",error);
        return new NextResponse(null,{status:404});
    }
}
