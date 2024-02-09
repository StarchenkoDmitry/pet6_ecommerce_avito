import db from "@/db";
import MyItem from "@/components/item/MyItem";
import { getItemsByUserId } from "@/services/item.service";
import { MYITEMS_PAGE__TAKE_ITEMS } from "@/constants";



export default async function Home() {
    const user = await db.user.currentUser();

    if (user) {
        const items = await getItemsByUserId(user.id,MYITEMS_PAGE__TAKE_ITEMS)

        return (
            <div className="p-2 bg-gray-50 rounded-lg">
                <span className="mx-1 text-xl">My items</span>
                <div className="flex flex-wrap justify-between bg-gray-100 rounded-lg">
                    {
                        items?.map((i) => (<MyItem key={i.id} item={i} />))
                    }
                </div>
            </div>
        );
    } else {
        return (
            <div className="p-2 bg-gray-50 rounded-lg">
                <span className="mx-1 text-xl">Зарегистрируйтесь</span>
            </div>
        );
    }
}
