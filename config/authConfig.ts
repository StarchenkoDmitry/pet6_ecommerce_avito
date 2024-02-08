import NextAuth from "next-auth";
import { cookies } from "next/headers";

import db from "@/lib/db";
import { v4 } from "uuid";

import { COOKIE_FAVORITE_KEY } from "@/lib/const";

import CredentialsProvider from "next-auth/providers/credentials";

import { transferFavorite } from "@/lib/services/favorite.service";
import { deleteAccessToken } from "@/lib/services/user.service";


const LOGGING_ENABLE = false;
const AUTH_DEBUG_ENABLE = false;


declare module 'next-auth' {
    interface User{
        accessToken:string;
    }
    interface Session{
        user:{
            userId?:string;
            accessToken?:string;
        }
    }
}

declare module "@auth/core/jwt" {
    interface JWT {
        userId?:string;
        accessToken?:string;
    }
}

export const { handlers, auth, signIn, signOut,update } = NextAuth({
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: "credentials",
            async authorize(credentials){
                if(LOGGING_ENABLE)
                console.log("/authorize:",credentials);

                const { email , password } = credentials;
                if(!email || !password)return null;

                const userRes = await db.user.findFirst({
                    where:{
                        emailProviders:{
                            some:{
                                email:email,
                                passwordhash:password,
                            }
                        }
                    }
                })

                if(!userRes)return null;

                const favoriteId = cookies().get(COOKIE_FAVORITE_KEY);
                if(favoriteId){
                    await transferFavorite(favoriteId.value,userRes.id);
                    cookies().delete(COOKIE_FAVORITE_KEY);
                }
                try {
                    const tokenRes = await db.accessToken.create({
                        data:{
                            expiresIn: new Date().toISOString(),
                            token:v4(),
                            userId:userRes.id,
                        }
                    });
                    if(!tokenRes)return null;
                    
                    return {
                        ...userRes,
                        accessToken:tokenRes.token
                    };
                } catch (error) {
                    return null;
                }
            }
        })
    ],

    debug:AUTH_DEBUG_ENABLE,
    session:{ strategy:"jwt", },
    callbacks: {
        async authorized(params) {
            if(LOGGING_ENABLE)
            console.log("/authorized:",params);
            return true;
        },
        //profile and email is undefinded
        async signIn({ user, account, profile, email, credentials }) {
            if(LOGGING_ENABLE)
            console.log("/signIn:",user,account,profile,email,credentials);
            return !!user;
        },
        async jwt({ token, user, session, trigger, account, profile}){
            if(LOGGING_ENABLE)
            console.log("/jwt:",token,user,session,trigger,account,profile);
            
            if(trigger === "update" && !!session 
            && !!session.user && session.user.accessToken === ""){
                //signOut
                const accessToken = token.accessToken;
                token.userId = undefined;
                token.accessToken = undefined;

                if(accessToken){
                    await deleteAccessToken(accessToken);
                }
            }
            
            if(trigger === "signIn"){
                token.userId = user.id;
                token.accessToken = user.accessToken;
            }
            
            // console.log("/jwt token:",token);
            return token;
        },
        async session({ session, newSession, token, trigger, user}){
            if(LOGGING_ENABLE)
            console.log("/session:",session,newSession,token,trigger,user);

            if(session.user){
                session.user.userId = token.userId;
                session.user.accessToken = token.accessToken;
            }
            
            return session;
        },
    },
});
