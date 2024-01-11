import { IconButton } from "@mui/material";

import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

export interface Props {}

function Header(props: Props) {
    return (
        <div className="p-2 flex items-center ">
            <div className="p-2">
                <a href="/">
                    <span className="mx-4 text-2xl">Avito</span>
                </a>
            </div>

            <nav className="ml-4">
                <ul className="flex [&>*:hover]:bg-gray-200 *:p-2 *:mx-1 *:rounded-full">
                    <li><a href="/">Главная</a></li>
                    <li><a href="/about">О нас</a></li>
                    <li><a href="/myitems">Мои объявления</a></li>
                </ul>
            </nav>

            <div className="ml-auto p-1">
                <IconButton 
                    className=""
                    color="primary">
                    <ShoppingBasketIcon/>
                </IconButton>
            </div>
        </div>
    )
}

export default Header;
