import db from "@/db";
import Item from "@/components/item/Item";


export default async function Home({ params }: { params: { id: string } }) {
    const { id } = params;

    const user = await db.user.currentUser();
    try {
        if (user) {
            const item = await db.item.findFirst({
                where: { id: id },
                include: {
                    user: {
                        select: {
                            id: true,
                            imageId: true,
                            name: true,
                            surname: true,
                        },
                    },
                    favorites: {
                        where: {
                            userId: user.id,
                        },
                    },
                },
            });

            if (item) {
                const owner = item.user ? item.user.id === user.id : false;
                const favorite = item.favorites.length >= 1;

                return (
                    <Item 
                        item={item} 
                        favorite={favorite} 
                        isOwner={owner} 
                        userOwner={item.user} 
                    />
                );
            }
        } else {
            const item = await db.item.findFirst({
                where: { id: id },
                include: {
                    user: {
                        select: {
                            id: true,
                            imageId: true,
                            name: true,
                            surname: true,
                        },
                    },
                },
            });
            if (item) {
                return (
                    <Item 
                        item={item} 
                        favorite={false} 
                        isOwner={false} 
                        userOwner={item.user} 
                    />
                );
            }
        }
    } catch (error) {
        console.log("Item page error:",error);
    }

    return (
        <div className="m-2 p-2">
            <h2 className="p-1">Item with id({id}) is not exist</h2>
        </div>
    )
}
