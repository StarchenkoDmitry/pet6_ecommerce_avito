'use server'
import { signIn } from "@/config/authConfig";
import db from "../db";


export async function registerWithCredentials(formData: FormData, dosingIn:boolean = true){
    console.log("registerWithCredentials formData: ",formData);

    const email = formData.get('email');
    const password = formData.get('password');

    if(typeof email !== "string" || typeof password !== "string"){
        return {
            registered:false,
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

        if(dosingIn){
            await signInWithCredentials(formData);
        }

        return {
            registered:true,
            userId: resRegistered.id
        };
    } catch (error) {
        console.log("registerWithCredentials error: ",error);
        return {
            registered:false,
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
            signUp:false,
            error:"email or password is not string",
        };
    }

    try {
        //проверить что будет если signIn выдаст ошибку при неверных данных
        const resSingIn = await signIn('credentials', {
            email: email,
            password: password,
            redirect:false,
        });
        // console.log("resSingIn: ",resSingIn);//example resSingIn:  http://127.0.0.1:3000/createitem
        return {
            signUp:true
        }
    } catch (error) {
        console.log("signInWithCredentials error: ",error);
        // throw error;
        return {
            signUp:false,
            error:"signInWithCredentials error 6475756874734675985478"
        }
    }
}



// export function dfgfdgdfg(params:type) {    
//     try {
//         const res = await signIn('credentials', {
//             // email: `Radn@gmail.cooi${Math.random()}`,
//             login: email,
//             password: password,
//             redirect:false,
//         });
//     } catch (error) {
//         console.log("authenticateWithCredentials error: ",error);
//         throw error;
//     }
// }





// export async function authenticateWithCredentials(formData: FormData){
//     console.log("authenticateWithCredentials formData: ",formData);

//     const login = formData.get('login');
//     const password = formData.get('password');
//     if(typeof login !== "string" || typeof password !== "string"){
//         return {
//             ok:false
//         };
//     }

//     try {
//         await signIn('credentials', {
//             // email: `Radn@gmail.cooi${Math.random()}`,
//             login: login,
//             password: password,
//             redirect:false,
//         });
//     } catch (error) {
//         // if (error instanceof AuthError) {
//         //     switch (error.type) {
//         //         case 'CredentialsSignin':
//         //         return 'Invalid credentials.';
//         //         default:
//         //         return 'Something went wrong.';
//         //     }
//         // }
//         console.log("authenticateWithCredentials error: ",error);
//         throw error;
//     }
// }
