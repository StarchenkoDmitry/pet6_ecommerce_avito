import db from "@/db";
import MyItem from "@/components/item/MyItem";


const MAX_TAKE_ITEM = 64;

export default async function Home() {
    const user = await db.user.currentUser();

    if (user) {
        const items = await db.item.findMany({
            where: {
                userId: user.id,
            },
            take:MAX_TAKE_ITEM
        });

        return (
            <div className="p-2 bg-gray-50 rounded-lg">
                <span className="mx-1 text-xl">My items</span>
                <div className="flex flex-wrap justify-between bg-gray-100 rounded-lg">
                    {
                        items.map((i) => (<MyItem key={i.id} item={i} />))
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
