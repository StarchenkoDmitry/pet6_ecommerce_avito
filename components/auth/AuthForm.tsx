'use client'
import { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";


function AuthForm() {
    const [register,setRegister] = useState(false);

    const handleChangeAuth = ()=>{
        setRegister(prev=>!prev);
    }

    return (
        <div className="w-80 flex flex-col rounded-2xl overflow-hidden bg-white shadow-md">
            {
                register ? 
                <SignUpForm/> :
                <SignInForm/>
            }

            {
                register ? 
                <button 
                    className="mb-2 mx-auto p-1 px-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-200 _text-start"
                    onClick={handleChangeAuth}
                >I have an account</button> :
                <button 
                    className="mb-2 mx-auto p-1 px-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-200 _text-start"
                    onClick={handleChangeAuth}
                >Register form</button>
            }
        
            <div className="p-3 text-sm _bg-blue-50 bg-orange-100">
                <h2 className="m-1 text-lg">SignIn from vender</h2>
                <ul>
                    <li>
                        <span className="block">In development</span>
                        <button className="p-2 rounded-full bg-white">
                            GitHub
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default AuthForm;
