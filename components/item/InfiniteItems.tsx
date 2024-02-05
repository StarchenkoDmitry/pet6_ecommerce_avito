'use client'

import { useLayoutEffect, useState } from 'react';
import Navbar from '../ui/Navbar';
import ItemView from './ItemView';
import { ItemAndFavorite } from '@/lib/types/item';
import { getItemsWithFavoriteWithQuery, searchItemsWithFavoriteByText } from '@/lib/actions/item';
import { COUNT_ITEMS_LOAD } from '@/lib/const';


interface Props {
    items:ItemAndFavorite[];
    countItems?:number;
    searchValue?:string;
}

function InfiniteItems({
    items:initItems,
    countItems,
    searchValue = ""
}: Props) {

    const [countLoaded,setCoundLoad] = useState(initItems.length);
    const [items,setItems] = useState(initItems);
    const [text,setText] = useState(searchValue);
    
    const [isLoading,setIsLoading] = useState(false);

    const changeText = async (text:string)=>{   
        const newItems = await searchItemsWithFavoriteByText(text);
        setItems(newItems ?? []);
    }
    
    const fetchItems = ()=>{
        if(isLoading){ return; }
        if(countItems && countItems - countLoaded <= 0){return;}

        setIsLoading(true);

        getItemsWithFavoriteWithQuery(countLoaded,COUNT_ITEMS_LOAD,text)
        .then((newItems)=>{
            if(!newItems)return;
            setItems(prev=>[...prev,...newItems]);
            setCoundLoad(prev=>prev + newItems.length);
            console.log("Query newItems",newItems);
        }).finally(()=>{
            console.log("Query finally");
            setIsLoading(false);
        });
    }

    useLayoutEffect(()=>{
        const handleScroll = (event:any)=>{
            const scrollHeight = event.target.documentElement.scrollHeight;
            const scrollTop = event.target.documentElement.scrollTop;
            const innerHeight = window.innerHeight;
            const isEndPage = scrollHeight === scrollTop + innerHeight + 2;
            console.log("IF: ",isEndPage);
        }
        window.addEventListener("scroll",handleScroll);
        return ()=>{
            window.removeEventListener("scroll", handleScroll);
        }
    },[]);

    const canLoad = countItems ? countItems - countLoaded > 0 : false;

    return (
        <div className="flex flex-col flex-1">
            <Navbar value={searchValue} onChangeText={changeText}/>

            <div className='flex flex-wrap justify-between'>
                <h2 className="mx-2 text-lg font-bold">Рекомендации для вас</h2>
                {
                    !!countItems && (
                        <span className='mx-2 max-[580px]:hidden'>кол-во товара на сайте {countItems}</span>
                    )
                }
            </div>
            
            <div className="bg-gray-100 rounded-lg flex flex-wrap justify-between">
                {items.map((i) => (
                    <ItemView key={i.id} item={i} />
                ))}
            </div>

            <div>
            {
                isLoading ? 
                <div className='my-2 p-2 w-full text-center bg-gray-100 rounded-lg'>
                    Loading
                </div> : 
                canLoad ? 
                <button
                    className='my-2 p-2 w-full bg-gray-100 rounded-lg'
                    onClick={fetchItems}
                >
                    показать ещё
                </button> : null
            }
            </div>

        </div>
    );
}

export default InfiniteItems;
