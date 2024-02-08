'use client'
import { useRef, useState } from 'react';
import Navbar from '../ui/Navbar';
import ItemView from './ItemView';
import { ItemAndFavorite } from '@/lib/types/item';
import { getItemsWithFavoriteAndCountByText } from '@/lib/actions/item';
import { COUNT_ITEMS_LOAD } from '@/lib/constants';


interface Props {
    items:ItemAndFavorite[];
    countItems?:number;
    searchValue?:string;
}

function ItemsSearch({
    items:initItems,
    countItems,
    searchValue = ""
}: Props) {

    const [items,setItems] = useState(initItems);
    const [text,setText] = useState(searchValue);

    // const [indexPage,setIndexPage] = useState(0);
    
    const [isLoading,setIsLoading] = useState();
    const reqText = useRef("");

    const changeText = async (text:string)=>{   
        // setText(text);
        const newItems = await getItemsWithFavoriteAndCountByText(COUNT_ITEMS_LOAD,0, text);
        setItems(newItems ? newItems.items :  []);
    }

    return (
        <div className="flex flex-col flex-1">
            
            <Navbar value={searchValue} onChangeText={changeText}/>

            <div className='flex flex-wrap justify-between'>
                <h2 className="mx-2 text-lg font-bold">Рекомендации для вас</h2>
                {
                    !!countItems && (
                        <span className='mx-2'>кол-во товара на сайте {countItems}</span>
                    )
                }
            </div>
            
            <div className="bg-gray-100 rounded-lg flex flex-wrap justify-between">
                {items.map((i) => (
                    <ItemView key={i.id} item={i} />
                ))}
            </div>

            {/* <div className='mt-auto flex'>
                <span>Page {indexPage+1}</span>
                <button>
                    Next Page
                </button>
            </div> */}
        </div>
    );
}

export default ItemsSearch;
