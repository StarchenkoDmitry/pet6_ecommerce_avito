"use client"
import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

// import { signOut } from '@/config/authConfig';

import { 
    XMarkIcon,
    ChatBubbleLeftRightIcon,
    BellIcon, 
    HeartIcon, 
    ShoppingBagIcon 
} from '@heroicons/react/24/solid';
    
import { User } from '@prisma/client';
import SignInButton from './SignInButton';
import { signOutAction } from '@/lib/actions/auth';


interface Props {
    user: User | null;
    isOpen:boolean;
    onClose?:()=>void;
}

function PanelHeader({user,isOpen,onClose}: Props) {

    const handleSignOut = ()=>{
        // signOut({
        //     redirect:false,
        // })
        signOutAction()
        .then((res)=>{
            console.log("signOut res",res);
        }).catch((ress)=>{
            console.log("signOut catch ress",ress);
        });
    }

    return (
        <div className={clsx(
            "z-30 fixed inset-0 w-full bg-gray-50 transition-all _duration-1000 duration-300",
            !isOpen && "left-full")}
            onClick={onClose}
        >
            <button className="block m-3 ml-auto hover:bg-gray-400 rounded-lg">    
                <XMarkIcon className="w-10 h-10"/>
            </button>
            <div className='m-2 flex flex-col items-end'>

                <ul className="flex flex-col items-end *:m-1 *:mx-2 *:py-1 *:px-2 *:bg-gray-100 [&>*:hover]:bg-gray-400 _[&>*]:text-sm *:rounded-full">
                    <li><Link href="/">Главная</Link></li>
                    <li><Link href="/about">О нас</Link></li>
                    <li><Link href="/myitems">Мои объявления</Link></li>
                    <li><Link href="/createitem">Разместить объявление</Link></li>
                </ul>

                <div className="flex flex-col m-2 *:my-1 *:p-2 *:bg-gray-100 [&>*:hover]:bg-gray-400 *:rounded-lg">
                    <Link className='' href="/favorites">
                        <HeartIcon className='inline-block w-6 h-6 text-blue-500'/>
                        Favorite
                    </Link>
                {
                    user &&
                    <>
                        <Link href="/profile/notifications">
                            <BellIcon className="inline-block w-6 h-6 text-blue-500"/>
                            Notifications
                        </Link>
                        <Link href="/chats">
                            <ChatBubbleLeftRightIcon className="inline-block w-6 h-6 text-blue-500"/>
                            Chats
                        </Link>
                        <Link href="/order/cart">
                            <ShoppingBagIcon className="inline-block w-6 h-6 text-blue-500"/>
                            CART
                        </Link>
                    </>
                }
                    
                </div>                
                {
                    user ?
                    <>
                        <Link 
                            className="block m-2 p-1 px-3 bg-sky-200 rounded-lg" 
                            href="/profile">
                            Profile
                        </Link>
                        <button
                            className='block m-2 _w-max p-1 px-3 text-white bg-orange-300 rounded-lg'
                            onClick={handleSignOut}>
                            Sign out2
                        </button>
                    </> :
                    <SignInButton/>
                }
            </div>
        </div>
    )
}

export default PanelHeader;
