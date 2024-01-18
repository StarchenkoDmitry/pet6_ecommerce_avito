'use client'

import { registerWithCredentials, signInWithCredentials } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";


function SignUpForm() {

    const [error,setError] = useState("");
    const [signUping,setSignUping] = useState(false);

    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault();

        if(signUping)return;
        setSignUping(true);

        try {
            const formData = new FormData(event.currentTarget)
            // console.log("eventeventevent: ",event);

            const response = await registerWithCredentials(formData);
            console.log('authenticateWithCredentials response:',response);
            if(response.registered){
                const resSignIn = await signInWithCredentials(formData);
                if(resSignIn.signUp){
                    router.push("/");
                }
            }else{
                setError(`Error registration ${response.error}`);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSignUping(false);
        }
    }

    return (
        <div className="w-80 flex flex-col rounded-lg overflow-hidden bg-white shadow-md">
            <div className="p-3 flex flex-col">
                <h2 className="m-1 text-xl">Вход</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        className="my-1 py-2 p-1 text-sm flex-1 rounded-lg placeholder-gray-500 bg-gray-100 hover:bg-gray-200 focus:bg-white focus:outline-green-400"
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
                        SignUp
                    </button>
                </form>
            </div>

            <div className="p-3 text-sm bg-orange-100">
                <h3 className="m-1">SignIn from vender</h3>
                <ul>
                    <li>
                        <button className="p-2 rounded-full bg-white">
                            GitHub
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SignUpForm;




            // formData.append("login",event.currentTarget)
            // const response = await fetch('/api/signup', { 
            //     method: 'POST',
            //     body: formData,
            //     // body:{ dimka:100 }
            // })