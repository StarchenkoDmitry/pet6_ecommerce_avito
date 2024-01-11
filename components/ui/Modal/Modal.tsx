'use client'

import clsx from "clsx";
import { useRef } from "react";

interface ModalProps{
    className?:string;
    children?: React.ReactNode;

    open:boolean;
    onClose?:()=>void;
}

export default function Modal({ 
    className, 
    children, 
    open,
    onClose,
}: ModalProps) {
    
    const refBack = useRef(null);

    const handleClose = (event: any)=>{
        // console.log("EVENT :",event.target)
        if(event.target === refBack.current){
            if(onClose) onClose();
        }
    }

    return (
        <div
            ref={refBack}
            className={clsx(
                "fixed inset-0",
                className,
                open ? "block" :"hidden",
            )}
            onClick={handleClose}
        >
            {children}
        </div>
    );
}
