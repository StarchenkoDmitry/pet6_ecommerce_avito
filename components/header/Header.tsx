'use client'

import Link from "next/link";
import AccountHeader from "./AccountHeader";
import { Bars4Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { User } from "@prisma/client";
import clsx from "clsx";
import { useState } from "react";
import NavHeader from "./NavHeader";
import PanelHeader from "./PanelHeader";


export interface Props {
    user:User | null;
}

function Header({user}: Props) {
    console.log("Render Header");

    const [isOpen,setIsOpen] = useState(false);

    const openPanel = ()=>{ setIsOpen(true); }
    
    const closePanel = ()=>{ setIsOpen(false); }

    return (
        <div className="p-2 py-1 flex items-center">
            <div className="p-2">
                <a href="/">
                    <span className="mx-4 text-2xl">Avito</span>
                </a>
            </div>

            <NavHeader/>

            <AccountHeader user={user}/>

            <button
                className="hidden max-[850px]:block"
                onClick={openPanel}
            >
                <Bars4Icon className="w-10 h-10"/>
            </button>

            <PanelHeader isOpen={isOpen} onClose={closePanel}/>
        </div>
    )
}

export default Header;
