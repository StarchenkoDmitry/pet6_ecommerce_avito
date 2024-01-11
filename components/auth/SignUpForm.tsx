'use client'

import { FormEvent, useRef } from "react";


interface Props {

}

function SignUpForm(props: Props) {

    const signing = useRef(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault();

        if(signing.current)return;
        signing.current = true;

        try {
            const formData = new FormData(event.currentTarget)
            const response = await fetch('/api/signup', { 
                method: 'POST',
                body: formData,
            })
        
            if (!response.ok) {
                throw new Error('Failed to submit the data. Please try again.')
            }
        
            // Handle response if necessary
            const data = await response.json()
            console.log("DATA: ",data);
        } catch (error) {
            console.error(error);
        } finally {
            signing.current = false;
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
                        name="login"
                        placeholder="Phone or email"/>
                    <input 
                        className="my-1 py-2 p-1 text-sm rounded-lg placeholder-gray-500 bg-gray-100 hover:bg-gray-200 focus:bg-white focus:outline-green-400"
                        type="password"
                        name="password" 
                        placeholder="password" />
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
