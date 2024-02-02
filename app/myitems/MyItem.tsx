import { Item } from '@prisma/client';
import ItemImage from '@/components/ui/ItemImage';

export interface Props {
    item: Item;
}

function MyItem({item}: Props) {
    const { id, mainImageId, lable, price } = item;

    return (
        <div className="m-2 p-2 w-64 bg-white rounded-lg">
            <a href={`/item/${id}`}>
                <ItemImage
                    className="w-[250px] h-[200px] object-cover"
                    id={mainImageId}
                    sizes='250px'
                />
            </a>
            <div className='flex _flex-wrap _flex-none justify-between'>
                <a href={"/"} className='p-1 line-clamp-2 break-words text-sm text-blue-500'>
                    {lable ? lable : "без имени"}
                </a>
            </div>
            <span className='px-1 block text-sm font-medium'>$ {price}</span>
        </div>
    )
}

export default MyItem;
