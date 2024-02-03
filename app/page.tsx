import Navbar from "../components/ui/Navbar";
import ItemsSearch from "@/components/item/ItemsSearch";
import { getItemsForMainPage } from "@/lib/services/item.service";


export default async function Home() {    
    let items = await getItemsForMainPage();

    return (
        <div className="p-2">
            <Navbar />
            <h2 className="m-2 my-1 text-xl font-bold">Рекомендации для вас</h2>
            {
                items ? 
                <ItemsSearch items={items}/> : 
                <div>
                    error loading
                </div>
            }
        </div>
    );
}
