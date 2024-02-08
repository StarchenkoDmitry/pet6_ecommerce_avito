'use server'
import { 
    signIn, 
    signOut, 
    update 
} from "@/config/authConfig";
import db from "@/db";


export async function signUpWithCredentials(formData: FormData, doSingIn:boolean = true){
    console.log("registerWithCredentials formData: ",formData);

    const email = formData.get('email');
    const password = formData.get('password');

    if(typeof email !== "string" || typeof password !== "string"){
        return {
            signUp:false,
            error:"email or password is not string",
        };
    }

    try {
        const resRegistered = await db.$transaction(async(ts)=>{
            const existEmail = await ts.emailProvider.findFirst({
                where:{
                    email:email
                }
            });

            if(existEmail){
                throw new Error("email is already registered");
            }

            const userCreated = await ts.user.create({
                data:{
                    name:"DIMKA",
                }
            });
            
            if(!userCreated){
                throw new Error("failed to create a user");
            }

            const emailProviderCreated = await ts.emailProvider.create({
                data:{
                    email:email,
                    passwordhash:password,
                    userId:userCreated.id
                }
            });

            if(!emailProviderCreated){
                throw new Error("failed to create a emailProvider");
            }

            return userCreated;
        });

        if(doSingIn){
            const signInRes = await signInWithCredentials(formData);
            return {
                signUp:true,
                signIn:signInRes.signIn,
                userId: resRegistered.id
            };
        }else{
            return {
                signUp:true,
                userId: resRegistered.id
            };
        }

    } catch (error) {
        console.log("registerWithCredentials error: ",error);
        return {
            signUp:false,
            error:"registration error"
        }
    }
}

export async function signInWithCredentials(formData: FormData){
    console.log("signInWithCredentials formData: ", formData);

    const email = formData.get('email');
    const password = formData.get('password');

    if(typeof email !== "string" || typeof password !== "string"){
        return {
            signIn:false,
            error:"email or password is not string",
        };
    }

    try {
        //проверить что будет если signIn выдаст ошибку при неверных данных
        const resSingIn = await signIn("credentials", {
            email: email,
            password: password,
            redirect:false,
        });
        
        return {
            signIn:true
        }
    } catch (error) {
        console.log("signInWithCredentials error:",error);
        // throw error;
        return {
            signIn:false,
            error:"server error"
        }
    }
}


export async function signOutAction(){
    try {
        //delete accessToken and clear it in token
        const sessionRes = await update({
            user:{ accessToken:"" }
        });
        // console.log("signOutAction update sessionRes",sessionRes);

        //for clear JWT
        const signOutRes = await signOut({
            redirect:false
        });
        // console.log("signOutAction signOut signOutRes",signOutRes);
        return true;
    } catch (error) {
        console.log("signOutAction error",error);
        return false;
    }
}
