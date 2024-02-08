'use client'
import { useState } from "react";

import { Bars4Icon } from "@heroicons/react/24/solid";

import { User } from "@prisma/client";

import AccountHeader from "./AccountHeader";
import NavHeader from "./NavHeader";
import PanelHeader from "./PanelHeader";


export interface Props {
    user:User | null;
}

function Header({user}: Props) {

    const [isOpen,setIsOpen] = useState(false);

    const openPanel = ()=>{ setIsOpen(true); }
    
    const closePanel = ()=>{ setIsOpen(false); }

    return (
        <div className="p-2 py-0 flex items-center">
            <div className="mx-4 p-2 max-[400px]:mx-2 max-[380px]:mx-0">
                <a href="/">
                    <span className="text-2xl">Avito</span>
                </a>
            </div>

            <NavHeader/>

            <AccountHeader user={user}/>

            <button
                className="hidden max-[750px]:block"
                onClick={openPanel}
            >
                <Bars4Icon className="w-10 h-10"/>
            </button>

            <PanelHeader user={user} isOpen={isOpen} onClose={closePanel}/>
        </div>
    )
}

export default Header;
