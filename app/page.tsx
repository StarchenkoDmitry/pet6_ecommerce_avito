import { 
    getCountItems, 
    getItemsForMainPage 
} from "@/services/item.service";
import InfiniteItems from "@/components/item/InfiniteItems";
import { ItemAndFavorite } from "@/types/item";


export const dynamic = "force-dynamic";

export default async function Home() {

    const data = await prepareDataForPage();

    return (
        <div className="flex flex-col flex-1 px-2">
            {
                data ? (
                    <InfiniteItems
                        items={data.items}
                        countItems={data.countItems}
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

async function prepareDataForPage()
:Promise<{
    items:ItemAndFavorite[],
    countItems:number
} | undefined>{
    const [items,countItems] = await Promise.all([
        getItemsForMainPage(),
        getCountItems()
    ]);

    if(!!items && typeof countItems === "number" && Number.isFinite(countItems)){
        return {
            items,
            countItems,
        }
    }else{
        return;
    }
}
