import React from 'react';
import ItemView from './ItemView';
import { ItemAndFavorite } from '@/lib/types/item';


interface Props {
    items:ItemAndFavorite[];
}

function ItemsSearch({items}: Props) {
    return (
        <div className="bg-gray-100 rounded-lg flex flex-wrap justify-between">
            {items.map((i) => (
                <ItemView key={i.id} item={i} />
            ))}
        </div>
    );
}

export default ItemsSearch;
