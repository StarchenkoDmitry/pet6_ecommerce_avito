import ItemsSearch from "@/components/item/ItemsSearch";
import { getCountItems } from "@/lib/actions/item";
import { getItemsForMainPage } from "@/lib/services/item.service";


export default async function Home() {
    // const items = await getItemsForMainPage();
    // const countItems = await getCountItems();

    const [items,countItems] = await Promise.all([
        getItemsForMainPage(4),
        getCountItems()
    ]);

    return (
        <div className="flex flex-col flex-1 px-2">
            {
                items ? (
                    <ItemsSearch
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
