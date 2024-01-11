import NextAuth, { User } from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

// import { SignInWithGitHub } from "lib/db/auth";
import { v4 } from "uuid";


declare module 'next-auth' {
    interface User{
        accountId:string
        accessToken:string
    }

    interface Session{
        accessToken:string
    }
}

declare module "@auth/core/jwt" {
    interface JWT {
        accountId:string;
        accessToken:string;
    }
}


export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [ 
        GitHub,
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              username: { label: "Username", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req):Promise<User | null> {
                console.log("/authorize:",credentials);
                const user: User = { 
                    id: v4(),
                    name: "J Smith", 
                    email: "jsmith@example.com",
                    accountId:v4(),
                    accessToken:v4(),
                };
                // console.log("Credentials user",user);
        
                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user;
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;
                }        
                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
        })
    ],
    callbacks: {
        async authorized(params) {
            console.log("/authorized:",params);
            return true;
        },
        async signIn({ user, account, profile, email, credentials }) {
            console.log("/signIn:",user,account,profile,email,credentials);

            // if(!account) return false;
            // if(!account.providerAccountId) return false;

            // const accessTokenRes = await SignInWithGitHub({
            //     avatarUrl:user.image as string,
            //     accountId: account?.providerAccountId,
            //     name: profile?.name as string,
            //     email: profile?.email as string,
            //     login: profile?.login as string,
            // })

            // if(!accessTokenRes)return false;

            // user.accessToken = accessTokenRes.accessToken;
            // user.accountId = account.providerAccountId;

            return true;
        },
        async redirect({ url, baseUrl }) {
            console.log("/redirect:",url,baseUrl);
            return baseUrl
        },
        async jwt({token,user, session,trigger}){
            console.log("/jwt:",token,user,session,trigger);
            
            if(user){
                token.accessToken = user.accessToken;
                token.accountId = user.accountId;
            }
            return token;
        },
        async session({ session, newSession, token, trigger, user}){
            console.log("/session:",session,newSession,token,trigger,user);

            if(session.user){
                session.user.accessToken = token.accessToken;
            }

            return session;
        },
    },
    session:{
        strategy:"jwt",
        // generateSessionToken() {
        //     const tok = v4();
        //     console.log("/generateSessionToken:",tok);
        //     return tok;
        // },
    },
    debug:true,
});
