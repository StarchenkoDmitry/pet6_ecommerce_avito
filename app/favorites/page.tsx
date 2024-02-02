import { cookies } from "next/headers";
import db from "@/lib/db";
import ItemView, { ItemAndFavorite } from "@/components/item/ItemView";
import { COOKIE_FAVORITE_KEY } from "@/lib/const";


export default async function Home() {
    const items = await getMyFavoriteItems();

    return (
        <div className="p-2">
            <div className="flex flex-col bg-gray-100 rounded-lg">
                <h2 className="mt-1 mx-4 text-xl">My favorites</h2>

                <div className="flex flex-wrap justify-between">
                    {items.map((i) => (
                        <ItemView key={i.id} item={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}

const MAX_TAKE_ITEM = 16;

async function getMyFavoriteItems(): Promise<ItemAndFavorite[]> {
    const user = await db.user.currentUser();

    if (user) {
        const items = await db.item.findMany({
            take: MAX_TAKE_ITEM,
            where: {
                favorites: {
                    some: {
                        userId: user.id,
                    },
                },
            },
        });
        return items.map((e) => ({ ...e, favorite: true }));
    } else {
        const myFLId = cookies().get(COOKIE_FAVORITE_KEY)?.value;

        if (myFLId) {
            const items = await db.item.findMany({
                take: MAX_TAKE_ITEM,
                where: {
                    tempFavorites: {
                        some: {
                            tempFavoriteListId: myFLId,
                        },
                    },
                },
            });
            return items.map((e) => ({ ...e, favorite: true }));
        } else {
            return [];
        }
    }
}
