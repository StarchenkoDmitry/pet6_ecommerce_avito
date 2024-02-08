'use server'
import db from "@/db";
import { 
    signIn, 
    signOut, 
    update 
} from "@/config/authConfig";

import { 
    MAX_EMAIL_LENGHT, 
    MAX_NAME_LENGHT, 
    MAX_PASSWORD_LENGHT, 
    MAX_SURNAME_LENGHT, 
    MIN_EMAIL_LENGHT, 
    MIN_NAME_LENGHT, 
    MIN_PASSWORD_LENGHT, 
    MIN_SURNAME_LENGHT
} from "@/constants";

import {validateEmail} from "@/utils/Validate";


export type SignUpResponse = {
    signUp:boolean;
    signIn?:boolean;
    error?:string;
    userId?:string;
}

export async function signUpWithCredentials(
    formData: FormData, 
    doSingIn:boolean = true
):Promise<SignUpResponse>{
    console.log("registerWithCredentials formData: ",formData);

    const email = formData.get('email');
    const password = formData.get('password');

    const name = formData.get('name');
    const surname = formData.get('surname');

    console.log("SIGN",email,password,name,surname);

    if( typeof email !== "string" || 
        typeof password !== "string" ||
        typeof name !== "string" ||
        typeof surname !== "string"){
        return {
            signUp:false,
            error:"email, password, name or surname is not string",
        };
    }

    if(email.length > MAX_EMAIL_LENGHT || email.length < MIN_EMAIL_LENGHT ){
        return {
            signUp:false,
            error:`email length is greater than ${MAX_EMAIL_LENGHT} or less than ${MIN_EMAIL_LENGHT}`
        };
    }

    if(!validateEmail(email)){
        return {
            signUp:false,
            error:`email filed is not email`
        };
    }

    if(password.length > MAX_PASSWORD_LENGHT || password.length < MIN_PASSWORD_LENGHT ){
        return {
            signUp:false,
            error:`password length is greater than ${MAX_PASSWORD_LENGHT} or less than ${MIN_PASSWORD_LENGHT}`
        };
    }

    if(name.length > MAX_NAME_LENGHT || name.length < MIN_NAME_LENGHT ){
        return {
            signUp:false,
            error:`name length is greater than ${MAX_NAME_LENGHT} or less than ${MIN_NAME_LENGHT}`
        };
    }

    if(surname.length > MAX_SURNAME_LENGHT || surname.length < MIN_SURNAME_LENGHT ){
        return {
            signUp:false,
            error:`surname length is greater than ${MAX_SURNAME_LENGHT} or less than ${MIN_SURNAME_LENGHT}`
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
                    name:name,
                    surname:surname,
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
