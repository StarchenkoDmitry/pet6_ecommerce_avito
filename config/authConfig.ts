import NextAuth from "next-auth";
// import { User } from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

// import { SignInWithGitHub } from "lib/db/auth";
import { v4 } from "uuid";
import db from "@/lib/db";


const AUTH_DEBUG = true; 

declare module 'next-auth' {
    interface User{
        // accountId:string
        // accessToken:string
        // userId:string;
    }

    interface Session{
        // accessToken:string
        user:{
            userId:string;
        }
    }
}

declare module "@auth/core/jwt" {
    interface JWT {
        // accountId:string;
        // accessToken:string;
        userId:string;
    }
}

// export type User = {
//     id:string;
// }

// export type User = {
//     id: string;
//     name: string;
//     email: string;
//     password: string;
//     role: 'teacher' | 'student';
//     image_url: string | null;
// };


export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [ 
        // GitHub,
        CredentialsProvider({
            id: 'credentials',
            name: "credentials",
            // credentials: {},
            // credentials: {
            //     username: { label: "Username", type: "text", placeholder: "jsmith" },
            //     password: { label: "Password", type: "password" }
            //   },
            //functiong for sing in
            async authorize(credentials){
                if(AUTH_DEBUG)
                console.log("/authorize:",credentials);

                const {email , password} = credentials;
                if(!email || !password)return null;
                // return {
                //     id:"",
                //     accessToken:"",
                //     accountId:""
                // };
                const res = await db.user.findFirst({
                    where:{
                        emailProviders:{
                            some:{
                                email:email,
                                password:password,
                            }
                        }
                    }
                })
                return res as any;

                // const user : User = { 
                //     id: v4(),
                //     email:"",
                //     image_url:"",
                //     name:"FDF",
                //     password:"dgfgfdg",
                //     role:"student"
                // };                
                // return user;
            }
        })
    ],
    debug:true,
    session:{
        strategy:"jwt",
        generateSessionToken() {
            const tok = "dimkaTOK_"+v4();
            console.log("/generateSessionToken:",tok);
            return tok;
        },
    },
    secret:"1997",
    callbacks: {
        async authorized(params) {
            if(AUTH_DEBUG)
            console.log("/authorized:",params);
            return true;
        },
        //profile and email is undefinded
        async signIn({ user, account, profile, email, credentials }) {
            if(AUTH_DEBUG)
            console.log("/signIn:",user,account,profile,email,credentials);
            return !!user;
        },
        async jwt({ token, user, session, trigger }){
            if(AUTH_DEBUG)
            console.log("/jwt:",token,user,session,trigger);
            
            if(trigger === "signIn"){
                token.userId = user.id;
            }
            
            return token;
        },
        async session({ session, newSession, token, trigger, user}){
            if(AUTH_DEBUG)
            console.log("/session:",session,newSession,token,trigger,user);

            if(session.user){
                session.user.userId = token.userId;
            }
            
            return session;
        },
    },
});








        // async redirect({ url, baseUrl }) {
        //     if(AUTH_DEBUG)
        //     console.log("/redirect:",url,baseUrl);
        //     return baseUrl
        // },



// /profile and email is undefinded
//         async signIn({ user, account, profile, email, credentials }) {
//             if(AUTH_DEBUG)
//             console.log("/signIn:",user,account,profile,email,credentials);

//             // if(!account) return false;
//             // if(!account.providerAccountId) return false;

//             // const accessTokenRes = await SignInWithGitHub({
//             //     avatarUrl:user.image as string,
//             //     accountId: account?.providerAccountId,
//             //     name: profile?.name as string,
//             //     email: profile?.email as string,
//             //     login: profile?.login as string,
//             // })

//             // if(!accessTokenRes)return false;

//             // user.accessToken = accessTokenRes.accessToken;
//             // user.accountId = account.providerAccountId;

//             return true;
//         },







// credentials: {
//     username: { label: "Username", type: "text", placeholder: "jsmith" },
//     password: { label: "Password", type: "password" }
//   },




// CredentialsProvider({
//     name: "credentials",
//     credentials: {},
//     async authorize(credentials, req):Promise<User | null> {
//         if(AUTH_DEBUG)
//         console.log("/authorize:",credentials);

//         const user: User = { 
//             id: v4(),
//             name: "J Smith", 
//             email: "jsmith@example.com",
//             accountId:v4(),
//             accessToken:v4(),
//         };
//         // console.log("Credentials user",user);

//         if (user) {
//             // Any object returned will be saved in `user` property of the JWT
//             return user;
//         } else {
//             // If you return null then an error will be displayed advising the user to check their details.
//             return null;
//         }        
//         // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//     }
// })






// async authorize(credentials, req):Promise<User | null> {
//         if(AUTH_DEBUG)
//         console.log("/authorize:",credentials);

//         const user: User = { 
//             id: v4(),
//             email: "jsmith@example.com",
//             password:v4(),
//         };
//         // console.log("Credentials user",user);

//         if (user) {
//             // Any object returned will be saved in `user` property of the JWT
//             return user;
//         } else {
//             // If you return null then an error will be displayed advising the user to check their details.
//             return null;
//         }        
//         // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//     }




// //functiong for sing in
// async authorize(credentials, req):Promise<User | null> {

//     if(AUTH_DEBUG)
//     console.log("/authorize:",credentials);

//     const user: User = { 
//         id: v4(),
//         name: "J Smith", 
//         email: "jsmith@example.com",
//         // accountId:{},
//         // accessToken:{},
//         // image:{}
//         // accountId:v4(),
//         // accessToken:v4(),
//     };
//     return user;
// }





// async jwt({token,user, session,trigger}){
//     if(AUTH_DEBUG)
//     console.log("/jwt:",token,user,session,trigger);
    
//     if(user){
//         token.accessToken = user.accessToken;
//         token.accountId = user.accountId;
//     }
//     return token;
// },