import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;

        const res = await db.itemImage.findFirst({
            where:{
                id:id
            },
            select:{
                buffer:true
            }
        });
    
        if(res){
            return new NextResponse(res.buffer);
        }else{
            return new NextResponse(null,{status:404});
        }
    } catch (error) {
        console.log("route api/image/[id] error:",error);
        return new NextResponse(null,{status:404});
    }
}
