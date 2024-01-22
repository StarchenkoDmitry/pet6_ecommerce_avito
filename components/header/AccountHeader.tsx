/* eslint-disable @next/next/no-img-element */
'use client'
import { useSession } from "next-auth/react";

import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { BellIcon, HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import SignInButton from "./SignInButton";
import { User } from "@prisma/client";


export interface Props {
    user?: User;
}

function AccountHeader({ user }: Props) {
    console.log("Render HeaderAccount");

    if(user){
        const imageUrl = user.imageId ? `/api/avatar/${user.imageId}` : "/img/1.jpg";

        return (
            <div className="ml-auto p-1 flex items-center">
                <div className="p-1 flex bg-gray-100 rounded-lg">
                    <a href="/favorites">
                        <HeartIcon className='w-6 h-6 text-blue-500'/>
                    </a>
                    <a href="/profile/notifications">
                        <BellIcon className="w-6 h-6 text-blue-500"/>
                    </a>
                    <a href="/profile/messenger">
                        <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-500"/>
                    </a>
                    <a href="/order/cart">
                        <ShoppingBagIcon className="w-6 h-6 text-blue-500"/>
                    </a>
                </div>
                <a href="/profile" className="mx-2">
                    <img
                        className="w-8 h-8 object-cover rounded-full hover:scale-[1.2] transition-all"
                        src={imageUrl}
                        alt="avatar"
                        // width={50}
                        // height={250}
                    />
                </a>
            </div>
        )
    }else{
        return (
            <div className="ml-auto p-1 flex items-center">
                <div className="p-1 flex bg-gray-100 rounded-lg">
                    <a href="/favorites">
                        <HeartIcon className='w-6 h-6 text-blue-500'/>
                    </a>
                    <a href="/profile/notifications">
                        <BellIcon className="w-6 h-6 text-blue-500"/>
                    </a>
                    <a href="/profile/messenger">
                        <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-500"/>
                    </a>
                    <a href="/order/cart">
                        <ShoppingBagIcon className="w-6 h-6 text-blue-500"/>
                    </a>
                </div>
                <SignInButton/>
            </div>
        )
    }
}
export default AccountHeader;
