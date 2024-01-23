import db from "@/lib/db"
import { COOKIE_FAVORITE_KEY } from "@/lib/constants"
import { cookies } from "next/headers"
import ItemView from "@/components/item/ItemView"

export default async function Home() {
  console.log("Render CreateItem page")

  const items = (await getMyFavoriteItems())
  .map((e) => ({ ...e, favorite: true }));

  return (
    <div className="">

      <div className="p1 flex flex-col bg-gray-100 rounded-lg">
        <h2 className="mt-1 mx-4 text-xl">My favorites</h2>

        <div className="flex flex-wrap justify-between">
          {items.map((i) => (
            <ItemView key={i.id} item={i} />
          ))}
        </div>

      </div>
    </div>
  )
}


const MAX_TAKE_ITEM = 16

async function getMyFavoriteItems() {
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
    })
    return items;
  } else {
    const myFLId = cookies().get(COOKIE_FAVORITE_KEY)?.value

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
      })
      return items;
    } else {
      return [];
    }
  }
}
