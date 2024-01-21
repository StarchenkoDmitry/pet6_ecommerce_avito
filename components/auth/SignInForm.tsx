'use client'

import { signInWithCredentials } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";


function SignInForm() {
    const router = useRouter();

    const [errorIn,setErrorIn] = useState("");
    const [signIning,setSignIning] = useState(false);

    const handleSubmitSignIn = async (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault();

        if(signIning)return;
        setSignIning(true);

        try {
            const formData = new FormData(event.currentTarget)

            const response = await signInWithCredentials(formData);
            console.log('authenticateWithCredentials response:',response);
            if(response.signUp){

            }else{
                setErrorIn(`Error registration ${response.error}`);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSignIning(false);
        }
    }

    return (
        <div className="p-3 flex flex-col">
            <h2 className="m-1 text-xl">SingIn</h2>
            <form className="flex flex-col" onSubmit={handleSubmitSignIn}>
                <input 
                    className="my-1 mb-4 py-2 p-1 text-sm flex-1 rounded-lg placeholder-gray-500 bg-gray-100 hover:bg-gray-200 focus:bg-white focus:outline-green-400"
                    type="text" 
                    name="email"
                    placeholder="Phone or email"
                />
                <input 
                    className="my-1 py-2 p-1 text-sm rounded-lg placeholder-gray-500 bg-gray-100 hover:bg-gray-200 focus:bg-white focus:outline-green-400"
                    type="password"
                    name="password"
                    placeholder="password"
                />
                <button className="p-1 block text-sm rounded-lg bg-green-400 hover:bg-green-300" type="submit">
                    SignIn
                </button>
            </form>
        </div>
    )
}

export default SignInForm;
