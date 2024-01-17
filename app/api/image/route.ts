import { handlers, signIn } from "@/config/authConfig"
import db from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server";


export async function GET(req: NextApiRequest) {
    const id = "36d4bd51-c870-49bd-bf83-a5223585c40c";

    const res = await db.image.findFirst({
        where:{
            id:id
        }
    });

    if(!res){
        return NextResponse.json({superAuth:1111});
    }else{
        return new NextResponse(res.buffer);
    }
}
