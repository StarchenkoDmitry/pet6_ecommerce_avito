import NextAuth from "next-auth";
import { cookies } from "next/headers";

import db from "@/db";
import { v4 } from "uuid";

import { 
    COOKIE_FAVORITE_KEY, 
    MAX_EMAIL_LENGHT, 
    MAX_PASSWORD_LENGHT, 
    MIN_EMAIL_LENGHT, 
    MIN_PASSWORD_LENGHT 
} from "@/constants";

import CredentialsProvider from "next-auth/providers/credentials";

import { transferFavorite } from "@/services/favorite.service";
import { deleteAccessToken } from "@/services/user.service";
import { comparePassword } from "@/utils/Password";
import { validateEmail } from "@/utils/Validate";


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

export const { handlers, auth, signIn, signOut, update } = NextAuth({
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: "credentials",
            async authorize(credentials){
                try {
                    if(LOGGING_ENABLE)
                    console.log("/authorize:",credentials);

                    const { email , password } = credentials;
                    if(!email || !password)return null;

                    if( typeof password !== "string" || 
                        typeof email !== "string"){
                        return null;
                    }
                    
                    if( email.length > MAX_EMAIL_LENGHT || 
                        email.length < MIN_EMAIL_LENGHT ){
                        return null;
                    }

                    if( password.length > MAX_PASSWORD_LENGHT || 
                        password.length < MIN_PASSWORD_LENGHT ){
                        return null;
                    }

                    if(!validateEmail(email)){
                        return null;
                    }

                    const userProvider = await db.emailProvider.findFirst({
                        where:{
                            email:email
                        }
                    });

                    if(!userProvider){
                        return null;
                    }
                    
                    const correctPassword = await comparePassword(password,userProvider.passwordhash)

                    if(!correctPassword){
                        return null;
                    }
                    
                    const userId = userProvider.userId;

                    const favoriteId = cookies().get(COOKIE_FAVORITE_KEY);
                    if(favoriteId){
                        await transferFavorite(favoriteId.value,userId);
                        cookies().delete(COOKIE_FAVORITE_KEY);
                    }
                    
                    const tokenRes = await db.accessToken.create({
                        data:{
                            expiresIn: new Date().toISOString(),
                            token: v4(),
                            userId: userId
                        }
                    });

                    if(!tokenRes){
                        return null;
                    }else{
                        return {
                            id: userId,
                            accessToken: tokenRes.token
                        };
                    }
                } catch (error) {
                    console.log("NextAuth CredentialsProvider authorize error:",error);
                    return null;
                }
            }
        })
    ],
    
    trustHost:true,

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
