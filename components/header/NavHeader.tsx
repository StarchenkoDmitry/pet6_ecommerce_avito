import Link from 'next/link';
import React from 'react'


interface Props {}

function NavHeader({}: Props) {
    return (
        <nav className="ml-4">
            <ul className="flex [&>*:hover]:bg-gray-200 [&>*]:text-sm *:p-2 *:mx-1 *:rounded-full">
                <li className="max-[510px]:hidden"><Link href="/">Главная</Link></li>
                <li className="max-[510px]:hidden"><Link href="/about">О нас</Link></li>
                <li className="max-[670px]:hidden"><Link href="/myitems">Мои объявления</Link></li>
                <li className="max-[850px]:hidden"><Link href="/createitem">Разместить объявление</Link></li>
            </ul>
        </nav>
    );
}

export default NavHeader;
