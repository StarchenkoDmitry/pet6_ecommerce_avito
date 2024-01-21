import db from "@/lib/db";
import { NextApiRequest } from "next"
import { NextRequest, NextResponse } from "next/server";




export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        // const id = "";

        const res = await db.itemImage.findFirst({
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




// export async function GET(
//     req: NextApiRequest,
//     { params }: { params: { id: string } }
// ) {
//     try {
//         const id = params.id;

//         const res = await db.image.findFirst({
//             where:{
//                 id:id
//             }
//         });
    
//         if(!res){
//             return NextResponse.json({superAuth:1111});
//         }else{
//             return new NextResponse(res.buffer);
//         }
//     } catch (error) {
//         return NextResponse.json({},{status:404});
//     }
// }
