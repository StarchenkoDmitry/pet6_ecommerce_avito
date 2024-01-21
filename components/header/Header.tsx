import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { BellIcon, HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import HeaderSignIn from "./HeaderSignIn";
import Link from "next/link";
import { auth } from "@/config/authConfig";
import HeaderAccount from "./HeaderAccount";


export interface Props {}

async function Header(props: Props) {
    console.log("Render Header");
    
    const session = await auth();
    

    return (
        <div className="p-2 flex items-center">
            <div className="p-2">
                <a href="/">
                    <span className="mx-4 text-2xl">Avito</span>
                </a>
            </div>

            <nav className="ml-4">
                <ul className="flex [&>*:hover]:bg-gray-200 [&>*]:text-sm *:p-2 *:mx-1 *:rounded-full">
                    <li><Link href="/">Главная</Link></li>
                    <li><Link href="/about">О нас</Link></li>
                    <li><Link href="/myitems">Мои объявления</Link></li>
                    <li><Link href="/createitem">Разместить объявление</Link></li>
                </ul>
            </nav>

            <div className="ml-auto p-1 flex items-center">
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

                <HeaderSignIn/>
                {/* <HeaderAccount/> */}
            </div>
        </div>
    )
}

export default Header;

















// export interface Props {}

// function Header(props: Props) {
//     return (
//         <div className="p-2 flex items-center">
//             <div className="p-2">
//                 <a href="/">
//                     <span className="mx-4 text-2xl">Avito</span>
//                 </a>
//             </div>

//             <nav className="ml-4">
//                 <ul className="flex [&>*:hover]:bg-gray-200 [&>*]:text-sm *:p-2 *:mx-1 *:rounded-full">
//                     <li><a href="/">Главная</a></li>
//                     <li><a href="/about">О нас</a></li>
//                     <li><a href="/myitems">Мои объявления</a></li>
//                     <li><a href="/createitem">Разместить объявление</a></li>
//                 </ul>
//             </nav>

//             <div className="ml-auto p-1 flex items-center">
//                 <a href="/favorites">
//                     <HeartIcon className='w-6 h-6 text-blue-500'/>
//                 </a>
//                 <a href="/profile/notifications">
//                     <BellIcon className="w-6 h-6 text-blue-500"/>
//                 </a>
//                 <a href="/profile/messenger">
//                     <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-500"/>
//                 </a>
//                 <a href="/order/cart">
//                     <ShoppingBagIcon className="w-6 h-6 text-blue-500"/>
//                 </a>

//                 <HeaderSignIn/>
//             </div>
//         </div>
//     )
// }

// export default Header;
