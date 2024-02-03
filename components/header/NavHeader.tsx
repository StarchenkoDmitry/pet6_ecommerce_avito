import Link from 'next/link';
import React from 'react'


interface Props {}

function NavHeader({}: Props) {
    return (
        <nav className="ml-4 max-[750px]:hidden">
            <ul className="flex [&>*:hover]:bg-gray-100 [&>*]:text-sm *:p-2 *:mx-1 *:rounded-full">
                <li className=""><Link href="/about">О нас</Link></li>
                <li className=""><Link href="/myitems">Мои объявления</Link></li>
                <li className=""><Link href="/createitem">Разместить объявление</Link></li>
            </ul>
        </nav>
    );
}

export default NavHeader;
