import { 
    getCountItems, 
    getItemsForMainPage 
} from "@/services/item.service";
import InfiniteItems from "@/components/item/InfiniteItems";


export const dynamic = "force-dynamic";

export default async function Home() {

    const [items,countItems] = await Promise.all([
        getItemsForMainPage(),
        getCountItems()
    ]);

    return (
        <div className="flex flex-col flex-1 px-2">
            {
                items ? (
                    <InfiniteItems
                        items={items}
                        countItems={countItems}
                    />
                ):(
                    <div>
                        error loading
                    </div>
                )
            }
        </div>
    );
}
