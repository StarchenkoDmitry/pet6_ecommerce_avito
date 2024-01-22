import Link from "next/link";
import AccountHeader from "./AccountHeader";
import { auth } from "@/config/authConfig";
import db from "@/lib/db";


export interface Props {}

async function Header(props: Props) {
    console.log("Render Header");

    const session = await auth();

    if(session){
        const user = await db.user.findFirst({ where:{ id:session.user.userId }});
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
                <AccountHeader user={user}/>
            </div>
        )
    }else{
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
                {/* <AccountHeader/> */}
            </div>
        )
    }
}

export default Header;
