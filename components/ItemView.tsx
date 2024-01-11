import { HeartIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';


export interface Props {
    url:string;
    title?:string;
}

function ItemView({url,title}: Props) {
    return (
        <div className="m-2 p-2 w-64 bg-white rounded-lg">
            <a href="">
                <Image
                    className=""
                    src={url}
                    alt="item"
                    width={250}
                    height={250}
                />
            </a>
            <div className='flex _flex-wrap _flex-none justify-between'>
                <a href={"/"} className='p-1 line-clamp-2 break-words text-sm text-blue-500'>
                    {title}
                </a>
                <HeartIcon className='flex-none m-1 w-6 h-6'/>
            </div>
            <span className='px-1 block text-sm font-medium'>2 800 ₽</span>
        </div>
    )
}

export default ItemView;
