'use client'
import { 
    useLayoutEffect, 
    useRef, 
    useState 
} from 'react';

import { COUNT_ITEMS_LOAD } from '@/constants';
import { ItemAndFavorite } from '@/types/item';
import { 
    getItemsWithFavoriteAndCountByText, 
} from '@/actions/item';

import Navbar from '../ui/Navbar';
import ItemView from './ItemView';


interface Props {
    items:ItemAndFavorite[];
    countItems?:number;
    searchValue?:string;
}

function InfiniteItems({
    items:initItems,
    countItems:initCount,
    searchValue = ""
}: Props) {

    const [countItems,setCountItems] = useState(initCount);

    const [canLoad,setCanLoad] = useState(true);
    const [items,setItems] = useState(initItems);
    
    const [isLoading,setIsLoading] = useState(false);
    const [isSearch,setIsSearch] = useState(false);

    const textRef = useRef(searchValue);
    const isNextSearch = useRef(false);


    const doSearch = async ()=>{
        if(isSearch || isLoading){ return; }

        setIsLoading(true);
        setIsSearch(true);
        isNextSearch.current = false;
        setItems([]);

        getItemsWithFavoriteAndCountByText(COUNT_ITEMS_LOAD,0,textRef.current)
        .then((res)=>{ 
            if(res){
                const { items,count } = res;
                setItems(items);
                setCountItems(count);
                setCanLoad(true);
            }else{
                setItems([]);
                setCountItems(0);
                setCanLoad(false);
            }
        })
        .finally(()=>{
            setIsLoading(false);
            setIsSearch(false);
            doNext();
        });
    }

    const changeText = async (text:string)=>{
        textRef.current = text;
        isNextSearch.current = true;
        doSearch();
    }
    
    const doNext = ()=>{
        if(isNextSearch.current){
            doSearch();
            return;
        }
    }

    const fetchItems = ()=>{
        if(isLoading){ return; }
        if(!canLoad){ return; }

        if(isSearch){ return; }

        setIsLoading(true);

        getItemsWithFavoriteAndCountByText(COUNT_ITEMS_LOAD,items.length,textRef.current)
        .then((res)=>{
            if(res){
                const { items,count } = res;
                setItems(prev=>[...prev,...items]);
                setCountItems(count);
                if(items.length === 0){
                    setCanLoad(false);
                }
            }else{
                setCanLoad(false);
                return;
            }
        }).finally(()=>{
            setIsLoading(false);
            doNext();
        });
    }

    useLayoutEffect(()=>{
        const handleScroll = (event:any)=>{
            const scrollHeight = event.target.documentElement.scrollHeight;
            const scrollTop = event.target.documentElement.scrollTop;
            const innerHeight = window.innerHeight;
            const isEndPage = scrollHeight < (scrollTop + innerHeight + 2);

            if(isEndPage){
                fetchItems();
            }
        }
        window.addEventListener("scroll",handleScroll);
        return ()=>{
            window.removeEventListener("scroll", handleScroll);
        }
    },[fetchItems]);

    return (
        <div className="flex flex-col flex-1">
            <Navbar value={searchValue} onChangeText={changeText}/>

            <div className='flex flex-wrap justify-between'>
                <h2 className="mx-2 text-lg font-bold">Рекомендации для вас</h2>
                {
                    !!countItems &&
                    <span className='mx-2 max-[580px]:hidden'>найдено {countItems} товара</span>
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
                    загружается
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
