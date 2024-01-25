import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;

        const res = await db.avatarImage.findFirst({
            where:{
                id:id
            }
        });
    
        if(!res){
            return NextResponse.json({superAuth:1111});
        }else{
            return new NextResponse(res.buffer);
        }
    } catch (error) {
        return NextResponse.json({},{status:404});
    }
}