'use client'

import Link from "next/link";
import { useState } from "react";

import { 
    ChatBubbleLeftRightIcon,
    BellIcon, 
    HeartIcon, 
    ShoppingBagIcon 
} from "@heroicons/react/24/solid";

import SignInButton from "./SignInButton";
import Avatar from "../ui/Avatar";

import { User } from "@prisma/client";


export interface Props {
    user: User | null;
}

function AccountHeader({ user }: Props) {

    const [isOpenMenu,setIsOpenMenu] = useState(false);

    const toggleMenu = ()=>{
        setIsOpenMenu(prev=>!prev);
    }

    const handleSignOut = ()=>{
        toggleMenu();
        //todo:SignOut
    }

    if(user){
        return (
            <div className="ml-auto p-1 flex items-center">
                <div className="p-1 flex bg-gray-100 rounded-lg">
                    <Link href="/favorites">
                        <HeartIcon className='w-6 h-6 text-blue-500'/>
                    </Link>
                    <Link href="/profile/notifications">
                        <BellIcon className="w-6 h-6 text-blue-500"/>
                    </Link>
                    <Link href="/chats">
                        <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-500"/>
                    </Link>
                    <Link href="/order/cart">
                        <ShoppingBagIcon className="w-6 h-6 text-blue-500"/>
                    </Link>
                </div>
                <div className="m-1 flex relative">
                    <button
                        onClick={toggleMenu}
                    >
                        <Avatar
                            className="w-[32px] h-[32px] object-cover rounded-full hover:scale-110 transition-all"
                            id={user.imageId}
                        />
                    </button>
                    <div hidden={!isOpenMenu} className="z-10 fixed inset-0" onClick={toggleMenu} ></div>
                    <div hidden={!isOpenMenu} className="z-20 absolute w-max right-0 top-full p-2 bg-white rounded-lg border-2">
                        <Link 
                            className="block mb-2 p-1 px-2 hover:bg-sky-200 rounded-lg" 
                            href="/profile"
                            onClick={toggleMenu}>
                            Profile
                        </Link>
                        <button 
                            className="block p-1 px-2 hover:bg-blue-300 bg-gray-100 rounded-lg"
                            onClick={handleSignOut}
                        >
                            Sing out
                        </button>
                    </div>
                </div>
            </div>
        )
    }else{
        return (
            <div className="ml-auto p-1 flex items-center">
                <div className="p-1 flex bg-blue-100 _bg-gray-100 rounded-lg">
                    <a href="/favorites">
                        <HeartIcon className='w-6 h-6 text-blue-500'/>
                    </a>
                </div>
                <SignInButton className="_max-[560px]:hidden"/>
            </div>
        )
    }
}

export default AccountHeader;
