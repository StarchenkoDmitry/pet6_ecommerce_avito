'use server'


import { signIn } from "@/config/authConfig";

export interface AuthenticateProps{
    formData: FormData;
}

export async function authenticateWithCredentials({
    formData
}:AuthenticateProps){
    console.log("authenticateWithCredentials formData: ",formData);
    try {
        await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
        });
    } catch (error) {
        // if (error instanceof AuthError) {
        //     switch (error.type) {
        //         case 'CredentialsSignin':
        //         return 'Invalid credentials.';
        //         default:
        //         return 'Something went wrong.';
        //     }
        // }
        console.log("authenticateWithCredentials error: ",error);
        throw error;
    }
}
