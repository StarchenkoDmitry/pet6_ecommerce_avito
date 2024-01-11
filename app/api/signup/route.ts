import { handlers } from "@/config/authConfig"
import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server";

import { z } from 'zod';

const schema = z.object({

})

export const RES_CODE_hgfhfg = 1000;

export async function POST(
    req: NextApiRequest
) {
    // const parsed = schema.parse(req.body)

    // console.log("body: ",req.body);
    // const parsed = schema.parse(req.body)
    // console.log("parsed: ",parsed);

    console.log("bodyy: ", req.url);


    // return NextResponse.json({superAuth:7});
    // return NextResponse.redirect("/post/123",307);

    // const url = req.url
    // url.pathname = '/dest';
    // return NextResponse.rewrite(url)

    // return NextResponse.rewrite(new URL('/dest', req.url));

    
    return NextResponse.json({superAuth:7});
}
