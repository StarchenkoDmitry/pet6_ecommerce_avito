'use client'

import { registerWithCredentials } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";


function SingUpForm() {
    const router = useRouter();

    const [errorUp,setErrorUp] = useState("");
    const [signUping,setSignUping] = useState(false);

    const handleSubmitSignUp = async (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault();

        if(signUping)return;
        setSignUping(true);

        try {
            const formData = new FormData(event.currentTarget)

            const response = await registerWithCredentials(formData);
            console.log('authenticateWithCredentials response:',response);
            if(response.registered){

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
            <h2 className="m-1 text-xl">SingUp</h2>
            <form className="mb-4 flex flex-col" onSubmit={handleSubmitSignUp}>
                {/* <label className="mx-2" htmlFor="email">Email</label> */}
                <input 
                    className="my-1 mb-4 py-2 p-1 text-sm flex-1 rounded-lg placeholder-gray-500 bg-gray-100 hover:bg-gray-200 focus:bg-white focus:outline-green-400"
                    type="text" 
                    name="email"
                    placeholder="Phone or email"
                />
                {/* <label className="mx-2" htmlFor="password">Password</label> */}
                <input 
                    className="my-1 py-2 p-1 text-sm rounded-lg placeholder-gray-500 bg-gray-100 hover:bg-gray-200 focus:bg-white focus:outline-green-400"
                    type="password"
                    name="password"
                    placeholder="password"
                />
                <input 
                    className="my-1 mb-4 py-2 p-1 text-sm rounded-lg placeholder-gray-500 bg-gray-100 hover:bg-gray-200 focus:bg-white focus:outline-green-400"
                    type="password"
                    name="password"
                    placeholder="confirme password"
                />
                <button className="p-1 block text-sm rounded-lg bg-green-400 hover:bg-green-300" type="submit">
                    SignUp
                </button>
            </form>

            <button className="mx-auto p-1 px-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-200 _text-start">I have an account</button>
        </div>
    )
}

export default SingUpForm;
