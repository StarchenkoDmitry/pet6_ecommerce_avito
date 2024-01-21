'use client'

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Modal from "../ui/Modal/Modal";
import AuthForm from "../auth/AuthForm";


function HeaderSignIn() {

    const [open,setOpen]= useState(false);

    const handleOpen = ()=>{ setOpen(true); }
    const handleClose = ()=>{ setOpen(false); }

    return (
        <>
            <button className="m-1 px-2 p-1 rounded-lg text-white bg-blue-500" onClick={handleOpen}>
                Вход и регистрация
            </button>
            
            <Modal className="flex justify-center items-center bg-[rgba(0,0,0,0.5)]" open={open} onClose={handleClose}>
                <div className="relative">
                    <AuthForm/>
                    <button className="absolute right-[-48px] top-[-48px] _top-0 rounded-full hover:bg-[rgba(255,255,255,0.5)]"
                        onClick={handleClose}
                    >
                        <XMarkIcon className="p-1 w-12 h-12 text-white"/>
                    </button>
                </div>
            </Modal>
        </>
    )
}
export default HeaderSignIn;
