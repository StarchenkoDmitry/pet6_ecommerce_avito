'use client'
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { signUpWithCredentials } from "@/actions/auth";


function SignUpForm() {
    const router = useRouter();

    const [errorUp,setErrorUp] = useState("");
    const [signUping,setSignUping] = useState(false);

    const handleSubmitSignUp = async (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault();

        if(signUping)return;
        setSignUping(true);

        try {
            const formData = new FormData(event.currentTarget)

            const response = await signUpWithCredentials(formData);
            console.log('authenticateWithCredentials response:',response);
            if(response.signUp){
                router.refresh();
            }else{
                setErrorUp(`Error registration ${response.error}`);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSignUping(false);
        }
    }

    return (
        <div className="p-3 flex flex-col">
            <h2 className="m-1 text-xl">SignUp</h2>
            <form className="flex flex-col" onSubmit={handleSubmitSignUp}>
                <input 
                    className="my-1 py-2 p-1 text-sm flex-1 rounded-lg placeholder-gray-500 bg-gray-100 hover:bg-gray-200 focus:bg-white focus:outline-green-400"
                    type="email" 
                    name="email"
                    required
                    placeholder="Email"
                />
                <input 
                    className="my-1 py-2 p-1 text-sm rounded-lg placeholder-gray-500 bg-gray-100 hover:bg-gray-200 focus:bg-white focus:outline-green-400"
                    type="password"
                    name="password"
                    placeholder="Password"
                />
                
                <input 
                    className="my-1 py-2 p-1 text-sm flex-1 rounded-lg placeholder-gray-500 bg-gray-100 hover:bg-gray-200 focus:bg-white focus:outline-green-400"
                    type="text" 
                    name="name"
                    required
                    placeholder="* Name"
                />
                
                <input 
                    className="my-1 mb-4 py-2 p-1 text-sm flex-1 rounded-lg placeholder-gray-500 bg-gray-100 hover:bg-gray-200 focus:bg-white focus:outline-green-400"
                    type="text" 
                    name="surname"
                    required
                    placeholder="* Surname"
                />
                <button className="p-1 block text-sm rounded-lg bg-green-400 hover:bg-green-300" type="submit">
                    SignUp
                </button>
            </form>
        </div>
    )
}

export default SignUpForm;
