import db from "../db";

export async function deleteAccessToken(accessToken:string){
    try {
        const res = await db.accessToken.delete({
            where:{
                token:accessToken
            }
        });
        console.log("deleteAccessToken res",res);
        return;
    } catch (error) {
        console.log("deleteAccessToken error",error);
        return;
    }
}
